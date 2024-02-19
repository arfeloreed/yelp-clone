import React from "react";
import Header from "../components/Header";
import AddRestau from "../components/AddRestau";
import RestauList from "../components/RestauList";

function Home() {
  return (
    <div>
      <Header />
      <AddRestau />
      <RestauList />
    </div>
  );
}

export default Home;
