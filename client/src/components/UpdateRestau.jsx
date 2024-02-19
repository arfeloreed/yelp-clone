import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateRestau() {
  // variables
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("----");
  const restauUrl = "http://localhost:5000/restaurants";

  // helper functions
  async function getRestau() {
    try {
      const response = await axios.get(`${restauUrl}/${id}`);
      const selectedRestau = response.data.restaurant;

      if (selectedRestau) {
        setName(selectedRestau.name);
        setLocation(selectedRestau.location);
        setPriceRange(selectedRestau.price_range);
      } else {
        // raise the error page
        navigate("/error");
      }
    } catch (err) {
      console.error("Can't connect to server.", err.message);
    }
  }

  async function updateRestau(event) {
    event.preventDefault();
    try {
      const body = {
        name,
        location,
        price_range: priceRange,
      };

      await axios.patch(`${restauUrl}/${id}`, body);
      // window.location ="/";
      navigate("/");
    } catch (err) {
      console.error("Can't connect to server.", err.message);
    }
  }

  useEffect(() => {
    getRestau();
  }, []);

  return (
    <div>
      <form className="mt-5" onSubmit={(e) => updateRestau(e)}>
        <div className="form-group my-3">
          <label htmlFor="name" className="mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="location" className="mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="price_range" className="mb-2">
            Price Range
          </label>
          <select
            className="form-select"
            id="price_range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option disabled>----</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateRestau;
