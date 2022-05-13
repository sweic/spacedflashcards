import { NextFunction, Request, Response } from "express";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        console.log("------error handler-----")
        console.log(err)
        console.log("------error handler-----")    
        return res.status(409).send()
    } else {
        return next()
    }
    
}