import { NextFunction, Response } from "express"

export const routeGuard = (role: string) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (req?.user?.role !== role) {
            throw Error('Access denied , Unauthorized !')
        }
        next();
    }
}