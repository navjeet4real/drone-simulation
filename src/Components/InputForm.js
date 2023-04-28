import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { Button, Divider, Stack } from "@mui/material";
import { setData } from "../Redux/slices/app";
import { RHFTextField } from "./FormComponents";
import FormProvider from "./FormComponents/FormProvider";

const InputForm = () => {
  const dispatch = useDispatch();
  const [timeSeriesArray, setTimeSeriesArray] = useState([]);

  const TimeSeriesSchema = Yup.object().shape({
    lat: Yup.string(),
    lng: Yup.string(),
    timestamp: Yup.string(),
  });

  const defaultValues = {
    lat: "",
    lng: "",
    timestamp: "",
  };

  const methods = useForm({
    resolver: yupResolver(TimeSeriesSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const addData = () => {
    const { lat, lng, timestamp } = methods.getValues();
    const newData = {
      lat: lat,
      lng: lng,
      timestamp: timestamp,
    };

    setTimeSeriesArray([...timeSeriesArray, newData]);
    reset(defaultValues);
    // }
  };

  console.log(timeSeriesArray, "timeSeriesArray");
  const onSubmit = async (data) => {
    try {
      dispatch(setData(timeSeriesArray));
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <h2>Add time Series Data</h2>
        <p className="form-label">Longitutde</p>
        <RHFTextField
          name="lat"
          className="input_field"
          placeholder="e.g. 37.7749"
        />
        <p className="form-label">Latitude</p>
        <RHFTextField
          name="lng"
          className="input_field"
          placeholder="e.g. -122.4194"
        />
        <p className="form-label">Time</p>
        <RHFTextField
          name="timestamp"
          className="input_field"
          placeholder="e.g. 1640666400000"
        />
        <Button
          variant="outlined"
          sx={{ m: 2 }}
          onClick={() => {
            addData();
          }}
          className="btn2"
        >
          Add Data
        </Button>
        Create timeSeriesData
        <div>
          {timeSeriesArray.length > 0 && (
            <>
              <Stack>
                <h4>Time Series Data</h4>
                <p>lat lng timestamp</p>
              </Stack>
            </>
          )}
          {timeSeriesArray.length > 0 &&
            timeSeriesArray.map((item, index) => {
              return (
                <>
                  <div key={`data-${index}`}>
                      <p>
                        {item.lat} {item.lng} {item.time}
                      </p>
                  </div>
                </>
              );
            })}
        </div>
        <div className="Form_continue">
          <Button
            id="submitBTN"
            type="submit"
            variant="outlined"
            className="btn"
            sx={{ m: 2 }}
          >
            Continue
          </Button>
          Store it and Press Simulate
          <Divider />
          <Divider />
          <Divider />
        </div>
      </FormProvider>
    </>
  );
};

export default InputForm;
