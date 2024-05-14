import mongoose, {Schema} from "mongoose";

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },
    status: {
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending"
    },
    visit_status: {
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending"
    }

}, { timestamps: true });

export const Appointment = mongoose.model('Appointment',appointmentSchema)