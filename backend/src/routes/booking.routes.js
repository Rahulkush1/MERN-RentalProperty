import express from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { createBooking } from '../controllers/booking.controllers.js';

const router = express.Router();


router.route('/create').post(verifyJwt, createBooking)

export default router