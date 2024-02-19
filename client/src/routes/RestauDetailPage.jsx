import React, { useContext, useEffect } from "react";
import { RestauContext } from "../context/RestauContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Review from "../components/Review";
import AddReview from "../components/AddReview";
import StarRating from "../components/StarRating";

function RestauDetailPage() {
  const { selectedRestau, setSelectedRestau } = useContext(RestauContext);
  const { id } = useParams();
  const selectedRestauUrl = "http://localhost:5000/restaurants";

  async function getRestau() {
    try {
      const response = await axios.get(`${selectedRestauUrl}/${id}`);

      setSelectedRestau(response.data);
    } catch (err) {
      console.error("Can't connect to server.", err.message);
    }
  }

  useEffect(() => {
    getRestau();
  }, []);

  return (
    <div>
      {selectedRestau && (
        <>
          <h1 className="text-center display-1 my-5 fw-normal">
            {selectedRestau.restaurant.name}
          </h1>

          <div className="text-center mb-3">
            <StarRating rating={selectedRestau.restaurant.avg_rating} />
            <span className="text-warning ms-1">
              {selectedRestau.restaurant.reviews
                ? `(${selectedRestau.restaurant.reviews})`
                : "(0 Reviews)"}
            </span>
          </div>

          <div>
            <Review reviews={selectedRestau.reviews} />
          </div>

          <div className="mt-5">
            {/* <AddReview id={selectedRestau.restaurant.id} /> */}
            <AddReview />
          </div>
        </>
      )}
    </div>
  );
}

export default RestauDetailPage;
