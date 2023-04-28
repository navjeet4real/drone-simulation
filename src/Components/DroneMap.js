import React, { useEffect, useRef, useState } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polyline,
} from "google-maps-react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { resetData } from "../Redux/slices/app";

function DroneMap(props) {
  const mapStyles = {
    width: "60%",
    height: "60%",
    marginLeft: "200px",
    marginTop: "50px",
    position: "relative",
  };
  const { timeSeriesData } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  console.log(timeSeriesData, "time Series data");

  const [dronePosition, setDronePosition] = useState({
    lat: 37.7749,
    lng: -122.4194,
    timestamp: 1640666400000,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [dronePath, setDronePath] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const updateDronePath = (data) => {
    setDronePath(data);
    setDronePosition(data[0]);
    setCurrentIndex(0);
  };
  useEffect(() => {
    if (timeSeriesData && timeSeriesData.length > 0) {
      const fileInput = document.getElementById("file-input");
      fileInput.value = "";
      // alert("File upload is not allowed when timeseries data is present.");
      const data = timeSeriesData.map((item) => ({
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lng),
        timestamp: parseInt(item.timestamp),
      }));
      updateDronePath(data);
    } else if (selectedFile) {
      readCSVFile(selectedFile);
    }
  }, [timeSeriesData, selectedFile]);
  const readCSVFile = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.split("\n");
      const data = lines.slice(1).map((line) => {
        const [lat, lng, timestamp] = line.split(",");
        console.log(lat, lng, timestamp, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        return {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          timestamp: parseInt(timestamp),
        };
      });
      updateDronePath(data);
    };
  };
  console.log(dronePath, "droine path");
  const updateDronePosition = () => {
    setCurrentIndex((prevIndex) => {
      const targetTimestamp = dronePath[prevIndex + 1]?.timestamp;
      let nextIndex = prevIndex;
      while (
        nextIndex < dronePath.length - 1 &&
        dronePath[nextIndex + 1].timestamp <= targetTimestamp
      ) {
        nextIndex++;
      }
      if (nextIndex === dronePath.length - 1) {
        clearInterval(intervalId);
        setIsRunning(false);
      }
      return nextIndex;
    });
  };
  const simulateDroneMotion = () => {
    if (!isRunning && dronePath.length > 0) {
      setIsRunning(true);
      const id = setInterval(updateDronePosition, 1000);
      setIntervalId(id);
    } else {
      setIsRunning(false);
      clearInterval(intervalId);
    }
  };

  useEffect(() => {
    if (dronePath.length > 0) {
      setDronePosition(dronePath[currentIndex]);
    }
  }, [currentIndex, dronePath]);

  console.log(dronePosition, "droneposition");
  return (
    <>
      <div  >
        <div className="mb-5">
          <input
            type="file"
            id="file-input"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              dispatch(resetData([]));
            }}
          />
          <button className="simulate-button" onClick={simulateDroneMotion}>
            {isRunning ? "Stop" : "Simulate"}
          </button>
        </div>
        {dronePath.length > 0 && (
          <Map
            google={props.google}
            zoom={15}
            style={mapStyles}
            initialCenter={dronePath[0]}
          >
            {dronePosition && (
              <Marker
                key={`${dronePosition.lat}-${dronePosition.lng}`}
                position={dronePosition}
              />
              
            )}
            <Polyline
              path={dronePath.slice(0, currentIndex + 1)}
              strokeColor="#333"
              strokeOpacity={0.8}
              strokeWeight={5}
            />
          </Map>
        )}
      </div>
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(DroneMap);
