import "./App.css";
import React, { useState } from "react";
import InputForm from "./Components/InputForm";
import DroneMap from "./Components/DroneMap";
import MultipleDrones from "./Components/MultipleDrones";

const App = () => {
  return (
    <>
      <InputForm />
      <DroneMap />
      {/* <MultipleDrones /> */}
    </>
  );
};

export default App;
