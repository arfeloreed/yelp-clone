import React from "react";
import StarRating from "./StarRating";

function Review({ reviews }) {
  return (
    <div className="row row-cols-3 gap-3">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="card text-bg-primary mb-3"
          style={{ maxWidth: "30%" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span>{review.name}</span>
            <span>
              <StarRating rating={review.rating} />
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Review;
