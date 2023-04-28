import React, { useEffect, useRef, useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper,Polyline } from "google-maps-react";
import "../App.css";
function DroneMap(props) {
  const mapStyles = {
    width: "60%",
    height: "60%",
    marginLeft: "200px",
    marginTop: "50px",
    position: 'relative'
  };
  // const [dronePosition, setDronePosition] = useState({
  //   lat: 37.7749,
  //   lng: -122.4194,
  // });
  const dummyData = [
    { lat: 37.7749, lng: -122.4194, timestamp: 1640666400000 },
    { lat: 37.7751, lng: -122.4196, timestamp: 1640666401000 },
    { lat: 37.7753, lng: -122.4194, timestamp: 1640666402000 },
    { lat: 37.7755, lng: -122.4196, timestamp: 1640666403000 },
    { lat: 37.7757, lng: -122.4194, timestamp: 1640666404000 },
    { lat: 37.7759, lng: -122.4196, timestamp: 1640666405000 },
    { lat: 37.7761, lng: -122.4194, timestamp: 1640666406000 },
    { lat: 37.7763, lng: -122.4196, timestamp: 1640666407000 },
    { lat: 37.7765, lng: -122.4194, timestamp: 1640666408000 },
    { lat: 37.7767, lng: -122.4196, timestamp: 1640666409000 },
    { lat: 37.7769, lng: -122.4194, timestamp: 1640666410000 },
    { lat: 37.7767, lng: -122.4192, timestamp: 1640666411000 },
    { lat: 37.7765, lng: -122.4190, timestamp: 1640666412000 },
    { lat: 37.7763, lng: -122.4192, timestamp: 1640666413000 },
    { lat: 37.7761, lng: -122.4190, timestamp: 1640666414000 },
    { lat: 37.7759, lng: -122.4192, timestamp: 1640666415000 },
    { lat: 37.7757, lng: -122.4190, timestamp: 1640666416000 },
    { lat: 37.7755, lng: -122.4192, timestamp: 1640666417000 },
    { lat: 37.7753, lng: -122.4190, timestamp: 1640666418000 },
    { lat: 37.7751, lng: -122.4192, timestamp: 1640666419000 },
  ];

  const [dronePosition, setDronePosition] = useState(dummyData[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [dronePath, setDronePath] = useState([]);

  const readCSVFile = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.split("\n");
      const data = lines.slice(1).map((line) => {
        const [lat, lng, timestamp] = line.split(",");
        console.log(lat, lng, timestamp, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        return {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          timestamp: parseInt(timestamp),
        };
      });
      setDronePath(data);
    };
  };
console.log(dronePath, "droine path")
  const simulateDroneMotion = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === dummyData.length - 1) {
            clearInterval(intervalId);
            setIsRunning(false);
            return prevIndex;
          } else {
            return prevIndex + 1;
          }
        });
      }, 1000);
      setIntervalId(id);
    } else {
      setIsRunning(false);
      clearInterval(intervalId);
    }
  };

  useEffect(() => {
    if (dronePath.length > 0) {
      setDronePosition(dronePath[0]);
    }
  }, [dronePath]);


useEffect(() => {
    if (dronePath.length > 0) {
      setDronePosition(dronePath[currentIndex]);
    }
  }, [currentIndex, dronePath]);



  return (
    <>
      <div>
      <div className="mb-5">
          <input
            type="file"
            onChange={(e) => readCSVFile(e.target.files[0])}
          />
          <button className="simulate-button" onClick={simulateDroneMotion}>
            {isRunning ? "Stop" : "Simulate"}
          </button>
        </div>
        {dronePath.length > 0 && (
          <Map
            google={props.google}
            zoom={17}
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
