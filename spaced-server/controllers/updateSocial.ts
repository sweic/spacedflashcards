import { ActivityType, PrismaClient, PrismaPromise, usersocial } from "@prisma/client";
import { Request, Response } from "express";
import { UserActivity, UserActivityNotification } from "../ws/init";
import {v4 as uuidv4} from 'uuid'
import mongoose from "mongoose";

const prisma = new PrismaClient()

const hour = 1000 * 60 * 60

export const deleteActivity = async (req: Request, res: Response) => {
    const {target, newActivityHistory} = req.body as UserActivity
    const update = await prisma.usersocial.update({
        where: {
            username: target
        },
        data: {
            activityHistory: {
                set: newActivityHistory
            }
        }
    })
    if (!update) return res.status(409).send()
    return res.status(200).send()
}

export const sendFriendRequest = async (req: Request, res: Response) =>  {
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

    const final = await prisma.$transaction([create, sent])

    if (!final) return res.status(409).send()
    return res.status(200).send()

}

export const acceptFriendRequest = async (req: Request, res: Response) => {
    const {from, to, newActivityHistory} = req.body as UserActivity
    try {
        // requestedUser = sender, username: receipient.
        const senderData = await prisma.usersocial.findFirst({
            where: {
                username: from
            }
        })
        if (!senderData) return res.status(409).send()
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

        const results = await prisma.$transaction([updateReceiver, updateSender, createNotificationReceiver, createNotificationSender])
        if (!results) return res.status(409).send()
        return res.status(200).send()

    } catch(err) {
        return res.status(409).send()
    }
    
}

export const importSharedDeck = async (req: Request, res: Response) => {
    try {
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

        const txn = await prisma.$transaction([update, remove, create])
        if (!txn) throw 'txn'
        return res.status(200).send(deck.title)

    } catch (error) {
        return res.status(409).send()
    }
}



export const createNotification = async (req: Request, res: Response) => {
    try {
        const create = await prisma.$transaction([sendNotification(req.body as UserActivity, req.body.to)])
        if (!create) return res.status(409).send()
        return res.status(200).send()
    } catch (error) {
        return res.status(409).send()
    }
}

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
