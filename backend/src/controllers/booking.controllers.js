import { Booking } from "../models/booking.models.js";
import { Property } from "../models/property.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBooking = asyncHandler(async (req, res) => {
  console.log(req.body.booking);
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

  const statuses = Property.schema.path("status").enumValues;
  const property = await Property.findByIdAndUpdate(property_id, {
    status: statuses[1],
  });
  if (!property) {
    throw new ApiError(404, "Somthing went wrong while Booking property");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Booking property Successfully"));
});

const getAllUserBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.aggregate([
        {
            $match: {
                user: req.user._id,
            }
        },
        {
            $lookup: {
                from: "properties",
                localField: "property",
                foreignField: "_id",
                as: "property",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            price: 1,
                            status: 1,
                            numOfReviews: 1,
                            ratings: 1,
                            user: 1,
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                property: {
                    $first: '$property'
                }
            }
        }
    ])
    if (!bookings) {
      throw new ApiError(404, "No bookings found");
    }
    return res
     .status(200)
     .json(new ApiResponse(200, bookings, "Bookings fetched successfully"));
})
export { createBooking, getAllUserBookings };
