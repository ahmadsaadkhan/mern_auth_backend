import jwt from 'jsonwebtoken';
import express from 'express'
import { ObjectId } from 'mongodb';

const generateToken = (res: express.Response, userId: ObjectId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 100,
    });
};

export default generateToken;