import mongoose, { Schema } from "mongoose";

const AmenitySchema = new Schema({
  name: {
      type: String,
      required: true
  },
  description: {
      type: String
  },
});

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    prop_type: {
      type: String,
      enum: ["FLAT", "PG", "ROOM"],
      required: true,
    },

    publish: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "SOLD"],
      default: "AVAILABLE",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    amenities: [AmenitySchema],
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    numOfReviews: {
      type: Number,
      default: 0,
    },
    address: {
      street: {
        type: String,
        lowercase: true
      },
      city: {
        type: String,
        lowercase: true
      },
      state: {
        type: String,
        lowercase: true
      },
      zip: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema);
