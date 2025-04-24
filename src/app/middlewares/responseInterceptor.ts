import { NextFunction, Request, Response } from "express";

export const responseInterceptor = (req: Request, res: Response, next: NextFunction) => {
    const oldSend = res.send;

    res.send = function (body) {
        let formattedResponse;

        if (res.statusCode >= 400) {
            formattedResponse = {
                data: null,
                error: typeof body === 'string' ? { message: body } : body,
                success: false
            }

        } else {
            formattedResponse = {
                data: typeof body !== 'string' ? body : JSON.parse(body),
                error: null,
                success: true
            }
        }
        res.set('Content-Type', 'application/json');
        return oldSend.call(this, JSON.stringify(formattedResponse));

    }
    next()
}