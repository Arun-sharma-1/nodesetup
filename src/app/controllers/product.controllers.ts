import { Request, Response } from "express";
export const getProductInfo: any = (req: Request, res: Response) => {
    console.log('comimg here..')
    throw Error('new error')
    res.send('product')
}