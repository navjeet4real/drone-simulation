import React, { useState } from 'react';

const InputForm = ({ onSimulate }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [file, setFile] = useState(null);

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleTimestampChange = (event) => {
    setTimestamp(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSimulate = (event) => {
    event.preventDefault();
    onSimulate({ latitude, longitude, timestamp, file });
  };

  return (
    <form onSubmit={handleSimulate}>
      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="number"
          id="latitude"
          value={latitude}
          onChange={handleLatitudeChange}
          required
        />
      </div>
      <div>
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="number"
          id="longitude"
          value={longitude}
          onChange={handleLongitudeChange}
          required
        />
      </div>
      <div>
        <label htmlFor="timestamp">Timestamp:</label>
        <input
          type="datetime-local"
          id="timestamp"
          value={timestamp}
          onChange={handleTimestampChange}
          required
        />
      </div>
      <div>
        <label htmlFor="file">Upload CSV File:</label>
        <input type="file" id="file" accept=".csv" onChange={handleFileChange} />
      </div>
      <button type="submit">Simulate</button>
    </form>
  );
};

export default InputForm;