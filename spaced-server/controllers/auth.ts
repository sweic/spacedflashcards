import { asyncCatch } from "../middlewares/asyncCatch";
import { Response, Request } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export const registerAuth = asyncCatch(async (req: Request, res: Response) => {
    
    const {email, firstName, lastName, username, password} = req.body
    const usernameExist = await prisma.users.findFirst({where: {username: username}})
    const emailExist = await prisma.users.findFirst({where: {email: email}})
    if (usernameExist) {
        return res.status(409).send({errorCode: 0})
        
    } else if (emailExist) {
        return res.status(409).send({errorCode: 1})
        
    }
    else {
        bcrypt.genSalt(10, (saltError, salt) => {
            if (saltError) {
                return res.status(409).send({errorCode:2})
                
            }

            bcrypt.hash(password, salt, async (hashError, hash) => {
                if (hashError) {
                    return res.status(409).send({errorCode:3})
                    
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
                    return sendCookies(res, username)
                    
                })
            })

        })
        
    }   
})

export const loginAuth = asyncCatch(async (req: Request, res: Response) => {
    const {username, password} = req.body
    const match = await prisma.users.findFirst({where :{username: username}})
    if (match) {
        const correct = await bcrypt.compare(password, match.password)
        if (correct) {
            sendCookies(res, match.username)
            return
        } else {
            return res.status(409).send({errorCode: 0})
            
        }
    } else {
        return res.status(409).send({errorCode: 0})
        
    }
}) 

const generateAT = (input: string): string => {
    return jwt.sign(input, process.env.JWT_SECRET as jwt.Secret)
}
const generateRT = (input: string): string => {
    return jwt.sign(input, process.env.REFRESH_SECRET as jwt.Secret)
}

export const verifyCookie = asyncCatch((req: Request, res: Response) => {
    const accessToken = req.cookies.accessToken || "false"
    const refreshToken = req.cookies.refreshToken || "false"
    var user: string = "";
    jwt.verify(accessToken, process.env.JWT_SECRET as jwt.Secret, function(err: any, string: any) {
        if (err) {
            jwt.verify(refreshToken, process.env.REFRESH_SECRET as jwt.Secret, function(err: any, string: any) {
                if (err) {
                    return res.status(409).send({errorCode: 0})
                    
                }
                user = string
            })
        } else {
            user = string
        }
        if (res.headersSent) {
            return
        }
        return sendCookies(res, user)
        
    }
    )

})

const sendCookies = (res: Response, creds: string) => {
    const at = generateAT(creds)
    const rt = generateRT(creds)
    return res
        .status(200)
        .cookie("accessToken", at, {httpOnly: true, sameSite: "none", expires: new Date(new Date().getTime() + 60 * 1000 * 24 * 4), secure: true})
        .cookie("refreshToken", rt, {httpOnly: true, sameSite: "none", expires: new Date(new Date().getTime() + 60 * 1000 * 24 * 4), secure: true})
        .send({user: creds})
    
}

export const logoutAuth = asyncCatch((req: Request, res: Response) => {
    return res
        .status(200)
        .cookie("accessToken", "", {httpOnly: true, sameSite: "none", expires: new Date(new Date().getTime() +1), secure: true})
        .cookie("refreshToken", "", {httpOnly: true, sameSite: "none", expires: new Date(new Date().getTime() + 1), secure: true})
        .send()
})