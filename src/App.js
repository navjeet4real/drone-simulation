import "./App.css";
import React, { useState } from "react";
import InputForm from "./Components/InputForm";
import DroneMap from "./Components/DroneMap";
import SimpleMap from "./Components";

const App = () => {
  return (
    <>
      <InputForm />
      <DroneMap />
      {/* <SimpleMap /> */}
    </>
  );
};

export default App;
