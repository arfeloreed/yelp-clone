import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddRestau() {
  // variable
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5000";
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  // helper functions
  async function handleSubmit() {
    const body = {
      name,
      location,
      price_range: priceRange,
    };

    try {
      await axios.post(`${baseUrl}/restaurants`, body);

      // window.location = "/";
      navigate("/");
    } catch (err) {
      console.error("Can't connect to server.", err.message);
    }
  }

  return (
    <div className="my-4">
      <form>
        <div className="row align-items-center justify-content-center">
          <div className="col-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-auto">
            <input
              type="text"
              placeholder="Location"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="col-auto">
            <select
              className="form-select my-2"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>

          <div className="col-auto">
            <button type="submit" className="btn btn-success" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRestau;
