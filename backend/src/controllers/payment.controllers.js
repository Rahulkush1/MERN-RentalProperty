import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

const processPayment = asyncHandler(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount * 100,
        currency: "inr",
        customer: req.user.customer,
        metadata: {
            company: "RentalProperty",
        },
    });
    
    return res.status(201).json(new ApiResponse(201, {client_secret: myPayment.client_secret}, "Success"))
});

const sendStripeApiKey = asyncHandler(async (req, res, next) => {
	res.status(200).json(new ApiResponse(200,{ stripeApiKey: process.env.STRIPE_PUBLIC }));
});

export {processPayment, sendStripeApiKey}