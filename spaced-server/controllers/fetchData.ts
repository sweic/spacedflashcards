import mongoose from "mongoose";
import UserDeck from "../models/UserDecks";
import { Request, RequestHandler, Response } from "express";
import UserDashboard from "../models/UserDashboard";
import {
  UserDashboardType,
  UserDeckType,
  DashboardClientType,
  DeckClientType,
  Deck,
  Card,
  UserDashboardDeckType,
} from "../types/dashboardTypes";
import RRule from "rrule";
import { PrismaClient } from "@prisma/client";
import { asyncCatch } from "../middlewares/asyncCatch";
const prisma = new PrismaClient();
const hour = 1000 * 60 * 60;
interface FetchDataType {
  user: string;
  id?: string;
  force: boolean;
}
export const fetchData = asyncCatch(async (req: Request, res: Response) => {
  const { user, force } = req.body as FetchDataType;
  const userInfo = await prisma.users.findFirst({
    where: {
      username: user,
    },
    include: {
      userdecks: true,
      userdashboard: true,
      usersocial: true,
    },
  });

  const userDeck = userInfo?.userdecks;
  const userDashboard = userInfo?.userdashboard;
  const userSocial = userInfo?.usersocial;

  if (!userDeck || !userDashboard || !userSocial)
    throw new Error("missing data");
  const deckClient = await initialiseDashboard(
    userDashboard,
    userDeck,
    user,
    force!
  );
  return res.json({
    decks: userDeck,
    dashboard: deckClient,
    social: userSocial,
  });
});

export const fetchCardByID = asyncCatch(async (req: Request, res: Response) => {
  const { user, id } = req.body as FetchDataType;
  const target = await prisma.userdecks.findFirst({
    where: { username: user },
  });
  const deck = target!["decks"].find((deck: any) => deck.id === id);
  if (!deck) throw new Error("Deck in Userdecks not found");
  return res.status(200).send(deck);
});

const initialiseDashboard = async (
  dashboard: UserDashboardType,
  userDeck: UserDeckType,
  username: string,
  force: boolean
): Promise<DashboardClientType> => {
  var deckFinder: DeckClientType[] = [];
  var userdashboard = dashboard.decks;

  try {
    if (
      force ||
      !sameDay(new Date(dashboard.lastUpdated), new Date(Date.now() + hour * 8))
    ) {
      const update = await prisma.userdashboards.update({
        where: {
          username: username,
        },
        data: {
          lastUpdated: new Date(Date.now() + hour * 8),
          decks: {
            updateMany: {
              where: {},
              data: {
                completion: 0,
              },
            },
          },
        },
      });

      userdashboard = update.decks;
    }

    const num = userdashboard.reduce(
      (prev, deck) => {
        if (rruleIncludes(deck.rrule)) {
          prev[0] += deck.count;
          const target = userDeck.decks.find(
            (currDeck) => currDeck.id === deck.id
          );
          if (target) {
            deckFinder.push({
              id: deck.id,
              completion: deck.completion,
              count: deck.count,
              title: target.title,
              desc: target.desc,
            });
            prev[1] += deck.completion;
          }
        }
        return prev;
      },
      [0, 0]
    );

    return { total: num[0], decks: deckFinder, currentCompletion: num[1] };
  } catch (err) {
    throw err;
  }
};

function sameDay(d1: Date, d2: Date) {
  if (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
    return true;
  return false;
}

function rruleIncludes(rrule: string) {
  const rule = RRule.fromString(rrule);
  const currDate = new Date(Date.now() + hour * 8);
  const nextDate = new Date(Date.now() + hour * 32);
  return rule.between(currDate, nextDate).length > 0;
}
