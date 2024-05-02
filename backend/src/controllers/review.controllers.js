import { Property } from "../models/property.models.js";
import { Review } from "../models/review.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPropertyReview = asyncHandler(async (req, res) => {
  const { rating, comment, property_id } = req.body;

  const property = await Property.findById(property_id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }
  const review = await Review.findOne({
    $and: [{ property: property_id }, { user: req.user._id }],
  });

  if (review) {
    (review.rating = rating), (review.comment = comment);
    await review.save();
  } else {
    const review = await Review.create({
      name: req.user?.first_name + " " + req.user?.last_name,
      rating: rating,
      comment: comment,
      user: req.user._id,
      property: property._id,
    });
  }

  const createdReview = await Review.findOne({
    $and: [{ property: property_id }, { user: req.user._id }],
  });

  const property_t = await Property.aggregate([
    {
      $match: {
        _id: property._id,
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "property",
        as: "reviews",
      },
    },
    {
      $addFields: {
        numOfReviews: {
          $size: "$reviews",
        },
      },
    },
    {
      $project: {
        _id: 1,
        reviews: 1,
        numOfReviews: 1,
      },
    },
  ]);
  let avg = 0;
  property_t[0].reviews.forEach((rev) => {
    avg += rev.rating;
  });
  property.ratings = avg / property_t[0].reviews.length;
  property.numOfReviews = property_t[0].numOfReviews;
  await property.save({ validateBeforeSave: false });
  return res
    .status(201)
    .json(new ApiResponse(201, createdReview, "Review created successfully"));
});



export { createPropertyReview };
