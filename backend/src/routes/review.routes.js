import express from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { createPropertyReview } from '../controllers/review.controllers.js';
const router = express.Router();


router.route('/create').post(verifyJwt, createPropertyReview)


export default router;