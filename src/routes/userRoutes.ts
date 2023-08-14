import express from 'express';

import {
    authUser,
    getUserProfile,
    logoutUser,
    registerUser,
    updateUserProfile
} from '../controller/userController';
import { protect } from '../middleware/authMiddleware';

export default (router: express.Router) => {
    router.post('/users/auth', authUser)
    router.post('/users', registerUser)
    router.post('/users/logout', logoutUser)
    router
        .route('/users/profile')
        .get(protect, getUserProfile)
        .put(protect, updateUserProfile);
}