import mongoose from "mongoose";
import { Property } from "../models/property.models.js";
import { ApiError } from "../utils/ApiError.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const createProperty = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;
  let imagesObject = [];

  for (let i = 0; i < req.files.length; i++) {
    let localFilePath = req.files[i].path;
    console.log(localFilePath);
    if (!localFilePath) {
      throw new ApiError(400, "Please upload an property images");
    }

    const image = await uploadOnCloudinary(localFilePath);

    if (!image) {
      throw new ApiError(400, "Please upload image");
    }
    imagesObject.push({
      public_id: image.public_id,
      url: image.secure_url,
    });
  }
  req.body.images = imagesObject;
  const property = await Property.create(req.body);

  const createdProperty = await Property.findById(property?._id);

  if (!createdProperty) {
    throw new ApiError(500, "Somthing went wrong while creating property");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdProperty, "Property created successfully")
    );
});

const getAllProperties = asyncHandler(async (req, res) => {
  const resultPerPage = 6;
  const featureProduct = 3;
  // const productsCount = await Product.countDocuments();
  const statuses = Property.schema.path("status").enumValues;
  console.log(req.query);
  const apiFeature = new ApiFeatures(
    Property.find({ status: statuses[0] }),
    req.query
  )
    .search()
    .filter();

  let property = await apiFeature.query;
  let filteredProductsCount = property.length;

  apiFeature.pagination(resultPerPage);

  property = await apiFeature.query.clone();

  if (req.query.posted) {
    property = property.filter((p) => p.user);
  }

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { property: property, filteredProductsCount: filteredProductsCount },
        "Property fetched successfully"
      )
    );
});

const featureProperties = asyncHandler(async (req, res) => {

  if (!req.body) {
    throw new ApiError(400, "Please provide some filters");
  }

  const  properties = await Property.find({ 'address.city': req.body.city })
  if (!properties) {
    throw new ApiError(404, "Property not found");
  }

  res.status(200).json(new ApiResponse(200,properties, "Property fetched"));
  
})

const getPropertyDetails = asyncHandler(async (req, res) => {
  //   const property = await Property.findById(req.params.id);
  //   if (!property) {
  //     throw new ApiError(404, "Property not found");
  //   }
  const property = await Property.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.id),
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
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              _id: 1,
              role: 1,
              email: 1,
            },
          },

        ],
      },
    },
    {
      $lookup: {
        from: "appointments",
        localField: "_id",
        foreignField: "property",
        as: "appointment",
      }
    },
    {
      $addFields:{
          user:{
              $first: "$user"
        },
        appointment: {
          $first: "$appointment"
        }
      }
  },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        address: 1,
        status: 1,
        images: 1,
        reviews: 1,
        user: 1,
        appointment: 1
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        property[0],
        "Property  details Fetched successfully"
      )
    );
});

const updatePropertyDetails = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (property.user._id.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Unauthorized access");
  }

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  if (!req.body) {
    throw new ApiError(400, "Please provide property details");
  }

  const updatedProperty = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!updatedProperty) {
    throw new ApiError(500, "Somthing went wrong while updating property");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedProperty,
        "Property details updated successfully"
      )
    );
});

const updatePropertyImages = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  const imagePublicId = req.query.public_id;

  if (!property) {
    throw new ApiError(404, "Property not found");
  }
  if (property.user._id !== req.user._id) {
    throw new ApiError(401, "Unauthorized access");
  }
  if (!imagePublicId) {
    throw new ApiError(404, "Image not found");
  }

  if (!req.file) {
    throw new ApiError(400, "Please provide property images");
  }

  let localFilePath = req.file?.path;

  if (!localFilePath) {
    throw new ApiError(400, "Please upload an property image");
  }

  const deletedImage = await deleteFromCloudinary(imagePublicId);

  const uploadedImage = await uploadOnCloudinary(localFilePath);

  if (!uploadedImage) {
    throw new ApiError(400, "Failed to upload image");
  }

  const updatedImage = {
    public_id: uploadedImage.public_id,
    url: uploadedImage.secure_url,
  };

  const imageIndex = property.images.findIndex(
    (image) => image.public_id === imagePublicId
  );

  if (imageIndex !== -1) {
    property.images.splice(imageIndex, 1, updatedImage);
  } else {
    throw new ApiError(404, "Image not found in property's images");
  }

  const updatedProperty = await property.save();

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProperty, "Image updated successfully"));
});

const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }
  if (property.user._id !== req.user._id) {
    throw new ApiError(401, "Unauthorized access");
  }

  for (let i = 0; i < property.images.length; i++) {
    await deleteFromCloudinary(property.images[i].public_id);
  }

  const deletedProperty = await Property.findByIdAndDelete(req.params.id);

  if (!deletedProperty) {
    throw new ApiError(500, "Somthing went wrong while deleting property");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Property deleted Successfully"));
});

const createPropertyReview = asyncHandler(async (req, res) => {
  const { rating, comment, property_id } = req.body;
  review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };

  const property = await Property.findById(property_id);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const isReviewed = property.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    property.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        (review.rating = rating), (review.comment = comment);
      }
    });
  } else {
    property.reviews.push(review);
    property.numOfReviews = property.reviews.length;
  }
});

export {
  createProperty,
  getPropertyDetails,
  getAllProperties,
  updatePropertyDetails,
  updatePropertyImages,
  deleteProperty,
  featureProperties
};
