import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import User from '../models/userModel'

import express from 'express';
//import * as jwt from 'jsonwebtoken'; // Import the JWT library


declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

export const protect = asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let token;
    token = req.cookies.jwt;
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorized, invalid token');
        }
    } else {
        res.status(401);
        throw new Error('Not Authorized, no token');
    }
});