import React, { useEffect, useContext } from "react";
import axios from "axios";
import { RestauContext } from "../context/RestauContext";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

function RestauList() {
  // variables
  const baseUrl = "http://localhost:5000";
  const navigate = useNavigate();
  const { restaurants, setRestaurants } = useContext(RestauContext);

  // helper functions
  async function getRestaurants() {
    try {
      const response = await axios.get(`${baseUrl}/restaurants`);

      setRestaurants(response.data);
    } catch (err) {
      console.error("Can't connect to server.", err.message);
    }
  }

  async function handleDelete(event, id) {
    event.stopPropagation();
    try {
      await axios.delete(`${baseUrl}/restaurants/${id}`);

      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (err) {
      console.error("Can't connect to server.", err.message);
    }
  }

  function handleUpdate(event, id) {
    event.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  }

  function selectRestau(id) {
    navigate(`/restaurants/${id}`);
  }

  function showReviews(rating, reviews) {
    if (reviews) {
      return (
        <>
          <StarRating rating={rating} />
          <span className="text-warning"> ({reviews})</span>
        </>
      );
    } else {
      return <span className="text-warning">0 Reviews</span>;
    }
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <div className="text-center">
      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr className="table-info">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => (
              <tr key={restaurant.id} onClick={() => selectRestau(restaurant.id)}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>{showReviews(restaurant.avg_rating, restaurant.reviews)}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleUpdate(e, restaurant.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(e, restaurant.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default RestauList;
