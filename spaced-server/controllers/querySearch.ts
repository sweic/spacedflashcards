import { PrismaClient, userSocialComponent } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient()
export const querySearchHistory = async (req: Request, res: Response) => {
    const {keywords} = req.body
    const targets = await prisma.users.findMany({
        where: {
            username: {
                startsWith: keywords
            }
        }
    })
    
    var result = []
    for (const user of targets) {
        result.push({
            userID: user.username,
            username: user.username
        })
    }


    return res.status(200).send(result)


}