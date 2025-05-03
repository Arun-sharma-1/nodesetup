import { NextFunction, Request, Response } from "express";

export const responseInterceptor = (req: Request, res: Response, next: NextFunction) => {
    const oldSend = res.send;

    res.send = function (body) {
        let formattedResponse;
        console.log('body type is  ', body, typeof body)
        if (res.statusCode >= 400) {
            formattedResponse = {
                data: null,
                error: body,
                success: false
            }

        } else {
            formattedResponse = {
                data: body,
                error: null,
                success: true
            }
        }
        res.set('Content-Type', 'application/json');
        return oldSend.call(this, JSON.stringify(formattedResponse));

    }
    next()
}