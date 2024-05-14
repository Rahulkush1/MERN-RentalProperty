import mongoose, { Schema } from "mongoose";


const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"

    },
    property: {
        type: Schema.Types.ObjectId,
        ref: "Property"
    },
    status: {
        type: String,
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paid_at: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    propertyPrice: {
        type: Number,
        required: true
    },
    BookingCharges: {
        type: Number,
        required: true
    }

    
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);