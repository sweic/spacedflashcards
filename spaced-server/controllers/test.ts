import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient()
export const clearTestAcc = async (req: Request, res: Response) => {
    try {
        await prisma.users.delete({
        where: {
            username: 'testacc2'
        },
        include: {
            userdecks: true,
            userdashboard: true,
            usersocial: true
        }
    })
    } catch(err) {
        return res.status(200).send()
    }
    return res.status(200).send()

}

export const resetAccounts = async (req: Request, res: Response) => {
    console.log('resetting accounts')
    try {
        const resetSocial = prisma.usersocial.updateMany({
            where: {
                AND: {
                    username: {
                        startsWith: 'testacc'
                    }
                }
            },
            data: {
                activityHistory: {
                    set: []
                },
                sentFriendRequest: {
                    set: []
                },
                friends: {
                    set: []
                }
            }
        })
        const resetDecks = prisma.userdecks.updateMany({
            where: {
                    username: {
                        startsWith: 'testacc'
                    }
            },
            data: {
                decks: {
                    set: []
                }
            }
        })
        await prisma.$transaction([resetDecks, resetSocial])

    } catch(err) {
        return res.status(200).send()
    }
    return res.status(200).send()
}