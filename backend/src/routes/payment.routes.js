import express from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { processPayment, sendStripeApiKey } from '../controllers/payment.controllers.js';

const router = express.Router()

router.route("/process").post(verifyJwt, processPayment);
router.route("/stripeapikey").get(verifyJwt, sendStripeApiKey);

export default router