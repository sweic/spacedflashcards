import mongoose from 'mongoose'
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {v4 as uuidv4} from 'uuid'
import { asyncCatch } from "../middlewares/asyncCatch";
import RRule from "rrule"
const prisma = new PrismaClient()

const weekdays = {
    'Mo': RRule.MO,
    'Tu': RRule.TU,
    'We': RRule.WE,
    'Th': RRule.TH,
    'Fr': RRule.FR,
    'Sa': RRule.SA,
    'Su': RRule.SU,
}
// add an async error catcher


export const saveDeck = asyncCatch(async (req: Request, res: Response) => {
    const {deck, title, desc, user, rrule, count} = req.body
    const newUUID = uuidv4().replace(/-/gi, "")
    let byweekday = []
    for (const day of rrule) {
        byweekday.push(weekdays[day as keyof typeof weekdays])
    }

    const newRule = new RRule({
        freq: RRule.DAILY,
        interval: 1,
        byweekday: byweekday
        
    })
    const newRuleString = newRule.toString()

    const newDeck = {
        title: title || new Date().getTime().toString().slice(-4),
        id: newUUID, 
        desc: desc || "",
        cards : deck,
        count: count,
        rrule: newRuleString
    }

    const newDashboardDeck = {
        id: new mongoose.Types.ObjectId().toString(),
        id_: newUUID,
        rrule: newRuleString,
        completion: 0,
        count: count,
    }

   await prisma.users.update({
        where: {username: user},
        data: {
            userdecks: {
                update: {
                    decks: {
                        push: newDeck
                    }
                }
            },
            userdashboard: {
                update: {
                    decks: {
                        push: newDashboardDeck
                    }
                }
            }
        }
    })
   
    res.status(200).send()
})

export const updateCount = asyncCatch(async (req: Request, res: Response) => {
    const {deckID, user} = req.body
    await prisma.userdashboards.update({
        where: {
            username: user,
        },
        data: {
            decks: {
                updateMany: {
                    where: {
                        id_: deckID
                    },
                    data: {
                        completion: {
                            increment: 1
                        }
                    }
                }
            }
        }
    })
    res.status(200).send()
})

export const deleteDeck = asyncCatch(async (req: Request, res: Response) => {
    const {deckID, username} = req.body
    await prisma.users.update({
        where: {
            username: username
        },
        data: {
            userdecks: {
                update: {
                    decks: {
                        deleteMany: {
                            where: {
                                id: deckID
                            }
                        }
                    }
                }
            },
            userdashboard: {
                update: {
                    decks: {
                        deleteMany: {
                            where: {
                                id_: deckID
                            }
                        }
                    }
                }
            }
        }
    })
    return res.status(200).send()
        
})

export const editDeck = asyncCatch(async (req: Request, res: Response) => {
    const {deck, title, desc, user, rrule, count, deckID} = req.body
    let byweekday = []
    for (const day of rrule) {
        byweekday.push(weekdays[day as keyof typeof weekdays])
    }

    const newRule = new RRule({
        freq: RRule.DAILY,
        interval: 1,
        byweekday: byweekday
        
    })
    const newRuleString = newRule.toString()

    const newDeck = {
        title: title || new Date().getTime().toString().slice(-4),
        id: deckID, 
        desc: desc || "",
        cards : deck,
        count: count,
        rrule: newRuleString
    }

    const newDashboardDeck = {
        id: new mongoose.Types.ObjectId().toString(),
        id_: deckID,
        rrule: newRuleString,
        completion: 0,
        count: count,
    }
    const updatedUser = await prisma.users.update({
        where: {
            username: user
        },
        data: {
            userdecks: {
                update: {
                    decks: {
                        updateMany: {
                            where: {
                                id: deckID
                            },
                            data: newDeck
                        }
                    }
                }
            },
            userdashboard: {
                update: {
                    decks: {
                        updateMany: {
                            where: {
                                id_: deckID
                            },
                            data: newDashboardDeck
                        }
                    }
                }
            }
        }
       

    })
    return res.status(200).send()
        
    
})

export const importDeck = asyncCatch(async (req: Request, res: Response) => {
    const {deckID, username} = req.body
    const target = await prisma.users.findFirst({
            where: {
                userdecks: {
                    decks: {
                        some: {
                            id: deckID
                        }
                    }
                }
            },
            include: {
                userdecks: true,
                userdashboard: true
            }
        })
    if (target) {
        const deckInfo = target.userdecks?.decks.find((deck) => {
            return deck.id === deckID
        })
        const dashboardInfo = target.userdashboard?.decks.find((deck) => {
            return deck.id === deckID
        })
        const newUUID = uuidv4().replace(/-/gi, "")
        deckInfo!.id = newUUID
        const newDashboardInfo = {
            id: new mongoose.Types.ObjectId().toString(),
            id_: newUUID,
            completion: 0,
            count: dashboardInfo!.count,
            rrule: dashboardInfo!.rrule
        }
        await prisma.users.update({
            where: {
                username: username
            },
            data: {
                userdecks: {
                    update: {
                        decks: {
                            push: deckInfo
                        }
                    }
                },
                userdashboard: {
                    update: {
                        decks: {
                            push: newDashboardInfo
                        }
                    }
                }
            }
        })
            
        return res.status(200).send({title: deckInfo?.title})
        } else {
            return res.status(409).send()
        }
    
})