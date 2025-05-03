import { Request, Response } from "express"
import { object, string } from 'yup';
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const loginSchema = object({
    email: string().email('Invalid email format').required('Email is required'),
    password: string().required('Password is required')
});
const registerSchema = object({
    firstName: string().required('First Name is required'),
    email: string().email('Invalid email format').required('Email is required'),
    password: string().required('Password is required')
})
export const loginUser: any = async (req: Request, res: Response) => {
    //validation + token generate
    try {
        const body = req?.body;
        //validation
        await loginSchema.validate(req.body, { abortEarly: false })
        const { email, password } = req.body;
        //reterive information
        const user = await User.findOne({ where: { email } });
        console.log('user', user)
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('isMatch', isMatch)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid  password' });
        }

        //Generate token
        const token = jwt.sign({ userId: user.id, email: user.email, role: 'admin' }, 'SECRET', { expiresIn: '1m' })
        console.log('token', token)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1 * 60 * 1000
        })
        res.json('Login successful');
    } catch (error: any) {
        console.error('Error => ', error.errors[0])
        throw error;
    }
}
export const login2fa: any = async (req: Request, res: Response) => {
    try {
        const { token } = req.cookies;
        console.log('token', token)
        if (!token) {
            throw Error('Token Not found');
        }
        const decodedToken: any = jwt.verify(token, 'SECRET');
        const { exp, iat, ...tokenPayload } = decodedToken;
        console.log('decodedToken', decodedToken)
        const updatedToken = jwt.sign({ ...tokenPayload, mode: 'light' }, 'SECRET', { expiresIn: '1h' })


        res.cookie('Token2Fa', updatedToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        }).send('Login Successfull')
    } catch (error) {
        console.error('Error =>  ', error);
        throw error;
    }
}
export const registerUser: any = async (req: Request, res: Response) => {
    //validation + hash + entry + token generate
    try {
        await registerSchema.validate(req?.body)
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create(
            { ...req.body, password: hashedPassword }
        )
        res.send(user);
    } catch (error) {
        console.error('Error => ', error)
        throw error;
    }
}