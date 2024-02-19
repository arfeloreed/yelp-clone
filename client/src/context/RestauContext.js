import React, { useState, createContext } from "react";

export const RestauContext = createContext();

export function RestauContextProvider(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestau, setSelectedRestau] = useState(null);

  return (
    <RestauContext.Provider
      value={{ restaurants, setRestaurants, selectedRestau, setSelectedRestau }}
    >
      {props.children}
    </RestauContext.Provider>
  );
}
