import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

function AddReview() {
  // variables
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("Rating");
  const [review, setReview] = useState("");
  const baseUrl = "http://localhost:5000/restaurants";

  // helper functions
  async function addReview() {
    const body = {
      name,
      review,
      rating,
    };

    try {
      await axios.post(`${baseUrl}/${id}/addReview`, body);

      // navigate(`${baseUrl}/${id}`);
      navigate(location.pathname);
    } catch (err) {
      console.error("Can't connect to server.", err.message);
    }
  }

  return (
    <div>
      <form onSubmit={addReview}>
        <div className="row mb-3">
          <div className="col-8">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="form-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            className="form-control"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={5}
          ></textarea>
        </div>

        <button type="sumbit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddReview;
