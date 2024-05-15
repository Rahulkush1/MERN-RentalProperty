import express from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { createBooking, getAllUserBookings } from '../controllers/booking.controllers.js';

const router = express.Router();


router.route('/create').post(verifyJwt, createBooking)
router.route('/user/all').get(verifyJwt, getAllUserBookings)

export default router