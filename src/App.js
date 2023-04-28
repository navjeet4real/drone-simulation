import "./App.css";
import React, { useState } from "react";
import InputForm from "./Components/InputForm";
import DroneMap from "./Components/DroneMap";

const App = () => {
  return (
    <>
      <InputForm />
      <DroneMap />
    </>
  );
};

export default App;
