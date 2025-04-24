import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw Error('No token provided')
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'SECRET');
        req.user = decoded;
        next()
    } catch (error) {
        console.error('Error ', error)
        throw Error('Invalid Or Token expired.')
    }
}