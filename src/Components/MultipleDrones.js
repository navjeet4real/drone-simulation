import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapMarker } from "../Redux/slices/app";
import markerIcon from "../Image/drone.png";

import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polyline,
} from "google-maps-react";

const MultipleDrones = (props) => {
  const mapStyles = {
    width: "60%",
    height: "60%",
    marginLeft: "200px",
    marginTop: "50px",
    position: "relative",
  };
  const markerStyle = {
    width: "30px",
    height: "30px",
    backgroundImage: `url(${markerIcon})`,
    backgroundSize: "cover",
    borderRadius: "50%",
    cursor: "pointer",
  };
  const [markerArray, setMarkerArray] = useState([
    {
      lat: 37.7749,
      lng: -122.4194,
      timestamp: 1640666400000,
    },
  ]);
  const dispatch = useDispatch();
  const { Markers } = useSelector((state) => state.app);

  const addMarker = () => {
    setMarkerArray(prevState => [
      ...prevState,
      {
        lat: +(prevState[prevState.length - 1].lat + 0.001).toFixed(4),
        lng: +(prevState[prevState.length - 1].lng + 0.001).toFixed(4),
        timestamp: prevState[prevState.length - 1].timestamp + 1000,
      }
    ]);
  };

  console.log(markerArray, "marker array", Markers);
  return (
    <>
      <Button
        variant="outlined"
        sx={{ m: 2 }}
        onClick={() => {
          addMarker();
        }}
        className="btn2"
      >
        Add Marker
      </Button>

      {markerArray.length > 0 &&
        markerArray.map((item, index) => {
          return (
            <>
              <div key={index}>
                <button id={`marker-${index + 1}`}>{`Marker ${
                  index + 1
                }`}</button>
              </div>
            </>
          );
        })}

      <Button
        variant="outlined"
        sx={{ m: 2 }}
        onClick={() => {
          dispatch(MapMarker(markerArray));
        }}
        className="btn2"
      >
        Plot Markers on map
      </Button>

      <Map
        google={props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{
          lat: 37.7749,
          lng: -122.4194,
          timestamp: 1640666400000,
        }}
      >
        {console.log(markerArray.length,"lentgertg")}
        {markerArray.length > 0 &&
          markerArray.map((item, index) => {
            return (
              <>
                {console.log(item, "position")}
                <Marker
                  key={`${item.lat}-${item.lng}`}
                  position={item}
                  style={markerStyle}
                />
              </>
            );
          })}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(MultipleDrones);
