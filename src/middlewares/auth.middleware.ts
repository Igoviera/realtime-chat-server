import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config()

const secretJWT = process.env.JWT_SECRET_KEY || ""

export function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).send({ message: 'Token JWT não fornecido na requisição' })
    }
    const tokenSplited = token.split('Bearer ')

    try {
        const decoded = jwt.verify(tokenSplited[1], secretJWT)
        next()
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token expirado' })
        }
        return res.status(401).send({ message: 'Token JWT inválido' })
    }
}