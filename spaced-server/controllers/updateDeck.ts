import mongoose from "mongoose";
import { PrismaClient, UserdecksDecks } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { asyncCatch } from "../middlewares/asyncCatch";
import RRule from "rrule";
const prisma = new PrismaClient();

const weekdays = {
  Mo: RRule.MO,
  Tu: RRule.TU,
  We: RRule.WE,
  Th: RRule.TH,
  Fr: RRule.FR,
  Sa: RRule.SA,
  Su: RRule.SU,
};
interface UpdateDeckType extends UserdecksDecks {
  user: string;
}
export const saveDeck = asyncCatch(async (req: Request, res: Response) => {
  const { cards, title, desc, user, rrule, count } = req.body as UpdateDeckType;
  const newUUID = uuidv4().replace(/-/gi, "");
  let byweekday = [];
  for (const day of rrule) {
    byweekday.push(weekdays[day as keyof typeof weekdays]);
  }

  const newRule = new RRule({
    freq: RRule.DAILY,
    interval: 1,
    byweekday: byweekday,
  });
  const newRuleString = newRule.toString();

  const newDeck = {
    title: title || new Date().getTime().toString().slice(-4),
    id: newUUID,
    desc: desc || "",
    cards: cards,
    count: count,
    rrule: newRuleString,
  };

  const newDashboardDeck = {
    id: new mongoose.Types.ObjectId().toString(),
    id_: newUUID,
    rrule: newRuleString,
    completion: 0,
    count: count,
  };

  await prisma.users.update({
    where: { username: user },
    data: {
      userdecks: {
        update: {
          decks: {
            push: newDeck,
          },
        },
      },
      userdashboard: {
        update: {
          decks: {
            push: newDashboardDeck,
          },
        },
      },
    },
  });

  res.status(200).send();
});

export const updateCount = asyncCatch(async (req: Request, res: Response) => {
  const { id, user } = req.body as Partial<UpdateDeckType>;
  await prisma.userdashboards.update({
    where: {
      username: user,
    },
    data: {
      decks: {
        updateMany: {
          where: {
            id_: id,
          },
          data: {
            completion: {
              increment: 1,
            },
          },
        },
      },
    },
  });
  res.status(200).send();
});

export const deleteDeck = asyncCatch(async (req: Request, res: Response) => {
  const { id, user } = req.body as Partial<UpdateDeckType>;
  await prisma.users.update({
    where: {
      username: user,
    },
    data: {
      userdecks: {
        update: {
          decks: {
            deleteMany: {
              where: {
                id: id,
              },
            },
          },
        },
      },
      userdashboard: {
        update: {
          decks: {
            deleteMany: {
              where: {
                id_: id,
              },
            },
          },
        },
      },
    },
  });
  return res.status(200).send();
});

export const editDeck = asyncCatch(async (req: Request, res: Response) => {
  const { cards, title, desc, user, rrule, count, id } =
    req.body as UpdateDeckType;
  let byweekday = [];
  for (const day of rrule) {
    byweekday.push(weekdays[day as keyof typeof weekdays]);
  }

  const newRule = new RRule({
    freq: RRule.DAILY,
    interval: 1,
    byweekday: byweekday,
  });
  const newRuleString = newRule.toString();

  const newDeck = {
    title: title || new Date().getTime().toString().slice(-4),
    id: id,
    desc: desc || "",
    cards: cards,
    count: count,
    rrule: newRuleString,
  };

  const newDashboardDeck = {
    id: new mongoose.Types.ObjectId().toString(),
    id_: id,
    rrule: newRuleString,
    completion: 0,
    count: count,
  };
  const updatedUser = await prisma.users.update({
    where: {
      username: user,
    },
    data: {
      userdecks: {
        update: {
          decks: {
            updateMany: {
              where: {
                id: id,
              },
              data: newDeck,
            },
          },
        },
      },
      userdashboard: {
        update: {
          decks: {
            updateMany: {
              where: {
                id_: id,
              },
              data: newDashboardDeck,
            },
          },
        },
      },
    },
  });
  return res.status(200).send();
});

export const importDeck = asyncCatch(async (req: Request, res: Response) => {
  const { id, user } = req.body as UpdateDeckType;
  const target = await prisma.users.findFirst({
    where: {
      userdecks: {
        decks: {
          some: {
            id: id,
          },
        },
      },
    },
    include: {
      userdecks: true,
      userdashboard: true,
    },
  });
  if (target) {
    const deckInfo = target.userdecks?.decks.find((deck) => {
      return deck.id === id;
    });
    const dashboardInfo = target.userdashboard?.decks.find((deck) => {
      return deck.id === id;
    });
    const newUUID = uuidv4().replace(/-/gi, "");
    deckInfo!.id = newUUID;
    const newDashboardInfo = {
      id: new mongoose.Types.ObjectId().toString(),
      id_: newUUID,
      completion: 0,
      count: dashboardInfo!.count,
      rrule: dashboardInfo!.rrule,
    };
    await prisma.users.update({
      where: {
        username: user,
      },
      data: {
        userdecks: {
          update: {
            decks: {
              push: deckInfo,
            },
          },
        },
        userdashboard: {
          update: {
            decks: {
              push: newDashboardInfo,
            },
          },
        },
      },
    });

    return res.status(200).send({ title: deckInfo?.title });
  } else {
    return res.status(409).send();
  }
});
