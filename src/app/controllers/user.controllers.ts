import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Member } from "../models/member.model";
export const getUserDetailById: any = async (req: any, res: Response) => {
    try {
        const { userId } = req.user;
        console.log('req.user', req.user)
        const result = await User.findOne({
            where: {
                id: userId
            },
            include: [
                {
                    model: Member,
                    as: 'memberInfo'
                }
            ]
        })
        res.send(result)
    } catch (error) {
        throw error;
    }
}
export const getUserInfo = (req: Request, res: Response) => {
    res.json({
        users: '3'
    })
}