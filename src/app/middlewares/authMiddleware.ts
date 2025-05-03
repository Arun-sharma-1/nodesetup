import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const { Token2Fa } = req.cookies;
    console.log('Token2Fa', Token2Fa)
    if ((!authHeader || !authHeader.startsWith('Bearer')) && !Token2Fa) {
        throw Error('No token provided')
    }
    const token = authHeader?.split(' ')[1] || Token2Fa
    console.log('token', token)
    try {
        const decoded = jwt.verify(token, 'SECRET');
        req.user = decoded;
        next()
    } catch (error) {
        console.error('Error ', error)
        throw Error('Invalid Or Token expired.')
    }
}