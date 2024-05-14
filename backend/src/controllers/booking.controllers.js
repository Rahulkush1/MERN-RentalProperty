import { Booking } from "../models/booking.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBooking = asyncHandler(async (req, res) => {
    console.log(req.body.booking)
    const {
        property_id,
        BookingCharges,
        propertyPrice,
        totalPrice,
        paymentInfo,
        status,
    } = req.body.booking;

  if (
    !property_id ||
    !propertyPrice ||
    !totalPrice ||
    !paymentInfo ||
    !BookingCharges
  ) {
    throw new ApiError(404, "All fields are required");
  }

  const booking = await Booking.create({
    user: req.user._id,
    property: property_id,
    BookingCharges,
    propertyPrice,
    totalPrice,
    paymentInfo,
    status,
    paid_at: Date.now(),
  });

  if (!booking) {
    throw new ApiError(404, "Somthing went wrong while Booking property");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Booking property Successfully"));
});


export {createBooking}