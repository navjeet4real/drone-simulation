import React, { useEffect, useRef, useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";


function DroneMap(props) {
    const mapStyles = {
        width: "100%",
        height: "100%",
      };
      const [dronePosition, setDronePosition] = useState({
        lat: 37.7749,
        lng: -122.4194,
      });
      const timeSeriesData = [
        { lat: 37.7749, lng: -122.4194 },
        { lat: 37.7775, lng: -122.4196 },
        { lat: 37.7803, lng: -122.4198 },
      ];
    
      const isMountedRef = useRef(false);
    
      useEffect(() => {
        isMountedRef.current = true;
        console.log(timeSeriesData, "time series ddd")
        let index = 0;
        const interval = setInterval(() => {
          if (isMountedRef.current && index < timeSeriesData.length) {
            setDronePosition({
              lat: timeSeriesData[index].lat,
              lng: timeSeriesData[index].lng,
            });
            console.log(dronePosition, "drone position")
            index++;

          } else {
            clearInterval(interval);
          }
        }, 1000);
    
        return () => {
          isMountedRef.current = false;
          clearInterval(interval);
        };
      }, []);
  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
    //   initialCenter={{ lat: 37.7749, lng: -122.4194 }}
    >
        {console.log(dronePosition, "jjjjjjjjjjjjjjjjjjjjj")}
      <Marker key={`${dronePosition.lat}-${dronePosition.lng}`} position={dronePosition} />
    </Map>
  );
}

export default GoogleApiWrapper({
//   apiKey: "Y"
})(DroneMap);
