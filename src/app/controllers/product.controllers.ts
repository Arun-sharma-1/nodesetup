import { Request, Response } from "express";
export const getProductInfo: any = (req: Request, res: Response) => {
    console.log('comimg here..')
    res.send('product')
}