import express from 'express';

export const notFound = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error)
}

export const errorHandler: express.ErrorRequestHandler = (err:any, req:express.Request, res:express.Response, next:express.NextFunction) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resourse not found';
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}