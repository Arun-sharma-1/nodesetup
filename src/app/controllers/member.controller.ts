import { Request, Response } from "express";
import { User } from "../models/user.model";

export const createMember: any = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        res.send(data)
    } catch (error) {
        console.error('Error => ', error);
        throw error;
    }
}
export const getUsersOfMember: any = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        console.log('req.params', req.params)

        const result = await User.findAll({
            where: {
                memberId: id
            }
        })
        res.send(result)
    } catch (error) {
        console.error('Error => ', error);
        throw error;
    }
}