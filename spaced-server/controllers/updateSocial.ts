import { ActivityType, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { UserActivity } from "../ws/init";
import { asyncCatch } from "../middlewares/asyncCatch";
const prisma = new PrismaClient()

const hour = 1000 * 60 * 60

export const deleteActivity = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const {target, newActivityHistory} = req.body as UserActivity
        await prisma.usersocial.update({
            where: {
                username: target
            },
            data: {
                activityHistory: {
                    set: newActivityHistory
                }
            }
        })
        return res.status(200).send()
    
})

export const sendFriendRequest = asyncCatch(async (req: Request, res: Response, next: NextFunction) =>  {
        const {to, from} = req.body as UserActivity
        const create = sendNotification(req.body, to)
        const sent = prisma.usersocial.update({
            where: {
                username: from
            },
            data: {
                sentFriendRequest: {
                    push: to
                }
            }
        })
    
        await prisma.$transaction([create, sent])
    
        return res.status(200).send()

})

export const acceptFriendRequest = asyncCatch(async (req: Request, res: Response) => {
    const {from, to, newActivityHistory} = req.body as UserActivity
        const senderData = await prisma.usersocial.findFirst({
            where: {
                username: from
            }
        })
        if (!senderData) throw new Error(`Sender ${from} not found`)
        const newSentRequest = senderData.sentFriendRequest.filter((val) => val !== to)
        const updateReceiver = prisma.usersocial.update({
            where: {
                username: to
            },
            data: {
                activityHistory: {
                    set: newActivityHistory
                },
                friends: {
                    push: from
                }
                
            }
        })
        const updateSender = prisma.usersocial.update({
            where: {
                username: from
            }, 
            data: {
                friends: {
                    push: to
                },
                sentFriendRequest: {
                    set: newSentRequest
                }
            }
        })

        const notificationReceiver = {
            from: to,
            to: from,
            type: ActivityType.ACCEPT,
        }
        const notificationSender = {
            from: from,
            to: to,
            type: ActivityType.ACCEPTED
        }

        const createNotificationReceiver = sendNotification(notificationReceiver, to )
        const createNotificationSender = sendNotification(notificationSender, from)

        await prisma.$transaction([updateReceiver, updateSender, createNotificationReceiver, createNotificationSender])
        return res.status(200).send()

    
})

export const importSharedDeck = asyncCatch(async (req: Request, res: Response) => {
        const {from, to, deck, newActivityHistory} = req.body as UserActivity
        const findDeck = await prisma.userdecks.findFirst({
            where: {
                username: from
            },
        })
        const findDashboard = await prisma.userdashboards.findFirst({
            where: {
                username: from
            },
        })
        if (!findDeck || !deck || !findDashboard) throw 'fi'
        var deckDetails = findDeck.decks.find((detail) => {
            return detail.id === deck.deckID
        })
        var dashboardDetails = findDashboard.decks.find((details) => {
            return details.id === deck.deckID
        })
        if (!deckDetails || !dashboardDetails) throw 'dec'
        const newUUID = uuidv4().replace(/-/gi, "")

        dashboardDetails.completion = 0
        dashboardDetails.id_ = newUUID
        dashboardDetails.id = new mongoose.Types.ObjectId().toString(),
        deckDetails.id = newUUID

        const update = prisma.users.update({
            where: {
                username: to
            },
            data: {
                userdecks: {
                    update: {
                        decks: {
                            push: deckDetails
                        }
                    }
                },
                userdashboard: {
                    update: {
                        decks: {
                            push: dashboardDetails
                        }
                    }
                }
            }
        })

        const remove = prisma.usersocial.update({
            where: {
                username: to
            },
            data: {
                activityHistory: {
                    set: newActivityHistory
                }
            }
        })
        const notificationBody = {
            from: from,
            to: to,
            type: ActivityType.IMPORTED,
            deck: deck
        }
        const create = sendNotification(notificationBody, to)

        await prisma.$transaction([update, remove, create])
        return res.status(200).send(deck.title)

})



export const createNotification = asyncCatch(async (req: Request, res: Response) => {
        await prisma.$transaction([sendNotification(req.body as UserActivity, req.body.to)])
        return res.status(200).send()
})

export const sendNotification = (notificationDetails: UserActivity, user: string) => {
    const {from, type, to, deck} = notificationDetails
   
    const newNotification = {
        from: from,
        to: to,
        type: type,
        when: new Date(Date.now() + hour * 8),
        deck: deck
    }
    return prisma.usersocial.update({
        where: {
            username: user
        },
        data: {
            activityHistory: {
                push: newNotification
            }
        }
    }) 
        
}
