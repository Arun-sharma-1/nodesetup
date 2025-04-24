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
        console.log('body', body)
        //validation
        await loginSchema.validate(req.body, { abortEarly: false })
        const { email, password } = req.body;
        //reterive information
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid  password' });
        }

        //Generate token
        const token = jwt.sign({ userId: user.id, email: user.email, role: 'admin' }, 'SECRET', { expiresIn: '1h' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        })
        res.json('Login successful');
    } catch (error: any) {
        console.error('Error => ', error.errors[0])
        res.json({ error: error.errors[0] })
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

        return res.status(200).json({ data: user })

    } catch (error) {
        console.error('Error => ', error)
        res.json({ error: error })
    }

}