import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
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
    }
},{timestamps: true});


export const Review = mongoose.model('Review',reviewSchema);