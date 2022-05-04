import mongoose from "mongoose";
import User from "../models/User";
import UserDeck from "../models/UserDecks";
import UserDashboard from '../models/UserDashboard'
import { Response, Request } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export const registerAuth = async (req: Request, res: Response): Promise<void> => {
    
    const {email, firstName, lastName, username, password} = req.body
    const usernameExist = await prisma.users.findFirst({where: {username: username}})
    const emailExist = await prisma.users.findFirst({where: {email: email}})
    if (usernameExist) {
        res.status(409).send({errorCode: 0})
        return
    } else if (emailExist) {
        res.status(409).send({errorCode: 1})
        return
    }
    else {
        bcrypt.genSalt(10, (saltError, salt) => {
            if (saltError) {
                res.status(409).send({errorCode:2})
                return
            }

            bcrypt.hash(password, salt, async (hashError, hash) => {
                if (hashError) {
                    res.status(409).send({errorCode:3})
                    return
                }
               
                await prisma.users.create({
                    data: {
                        username: username,
                        password: hash,
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        v: 0,
                        userdecks: {
                            create: {
                                username: username,
                                total: 0,
                                decks: [],
                                v: 0,
                            }
                        },
                        userdashboard: {
                            create: {
                                username: username,
                                lastUpdated: new Date(Date.now() + 1000 * 60 * 60 * 8),
                                decks: [],
                                v: 0,
                            }
                        },
                        usersocial: {
                            create: {
                                username: username,
                                v: 0,
                                searchHistory: [],
                                friends: [],
                                activityHistory: [],
                                
                            }
                        }
                    }
                }).then(() => {
                    sendCookies(res, username)
                    return
                })
            })

        })
        
    }   
}

export const loginAuth = async (req: Request, res: Response) => {
    const {username, password} = req.body
    const match = await prisma.users.findFirst({where :{username: username}})
    if (match) {
        const correct = await bcrypt.compare(password, match.password)
        if (correct) {
            sendCookies(res, match.username)
            return
        } else {
            res.status(409).send({errorCode: 0})
            return
        }
    } else {
        res.status(409).send({errorCode: 0})
        return
    }
} 

const generateAT = (input: string): string => {
    return jwt.sign(input, process.env.JWT_SECRET as jwt.Secret)
}
const generateRT = (input: string): string => {
    return jwt.sign(input, process.env.REFRESH_SECRET as jwt.Secret)
}

export const verifyCookie = (req: Request, res: Response) => {
    const accessToken = req.cookies.accessToken || "false"
    const refreshToken = req.cookies.refreshToken || "false"
    var user: string = "";
    jwt.verify(accessToken, process.env.JWT_SECRET as jwt.Secret, function(err: any, string: any) {
        if (err) {
            jwt.verify(refreshToken, process.env.REFRESH_SECRET as jwt.Secret, function(err: any, string: any) {
                if (err) {
                    res.status(409).send({errorCode: 0})
                    return
                }
                user = string
            })
        } else {
            user = string
        }
        if (res.headersSent) {
            return
        }
        sendCookies(res, user)
        return
    }
    )

}

const sendCookies = (res: Response, creds: string) => {
    const at = generateAT(creds)
    const rt = generateRT(creds)
    res
        .status(200)
        .cookie("accessToken", at, {httpOnly: true, sameSite: "none", expires: new Date(new Date().getTime() + 60 * 1000 * 24 * 4), secure: true})
        .cookie("refreshToken", rt, {httpOnly: true, sameSite: "none", expires: new Date(new Date().getTime() + 60 * 1000 * 24 * 4), secure: true})
        .send({user: creds})
    return
}

export const logoutAuth = (req: Request, res: Response) => {
    res
        .status(200)
        .cookie("accessToken", "", {httpOnly: true, sameSite: "none", expires: new Date(new Date().getTime() +1), secure: true})
        .cookie("refreshToken", "", {httpOnly: true, sameSite: "none", expires: new Date(new Date().getTime() + 1), secure: true})
        .send()
}