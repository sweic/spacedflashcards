import { RequestHandler } from "express";

export const asyncCatch = (requestHandler: RequestHandler): RequestHandler => async (req, res, next): Promise<any> => {
    try {
        return await requestHandler(req, res, next)
    }catch(err) {
        next(err)
    }
}


