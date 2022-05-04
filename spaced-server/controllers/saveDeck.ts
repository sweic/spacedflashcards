import mongoose from "mongoose"
import {Request, Response} from 'express'
import {v4 as uuidv4} from 'uuid'
import RRule from "rrule"
import { PrismaClient } from "@prisma/client"
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

export const saveDeck = async (req: Request, res: Response) => {
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

    const updatedUser = await prisma.users.update({
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

    if (updatedUser) {
        res.status(200).send()
        return
    } else {
        res.status(200).send()
    }
}