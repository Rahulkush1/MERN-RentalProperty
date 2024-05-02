import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  return (
    <div class="card w-100 mb-3 border-0">
      <div class="card-body">
        <b class="card-title">
          <img
            src="https://picsum.photos/200/200"
            className="img-fluid review-profile-img me-1"
            alt="profile"
          />{" "}
          {review.user}
        </b>
        <p class="card-text ms-5 ">
          <Stack spacing={1}>
            <Rating
              name="half-rating"
              className="rating_star"
              value={review.rating}
              precision={0.5}
              readOnly
            />
          </Stack>
          <p className="grey my-2">
            {review.review}
          </p>
        </p>
      </div>
      <hr />
    </div>
  );
};

export default ReviewCard;
