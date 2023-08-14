import express from 'express'
import userRoutes from './userRoutes';
const router = express.Router();

export default (): express.Router => {
    userRoutes(router);
    return router;
}