import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeSeriesData: [],
  Markers: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
        setData(state, action){
            state.timeSeriesData  = action.payload
        },
        resetData(state, action){
            state.timeSeriesData = action.payload
        },
        MapMarker(state, action){
            state.Markers = action.payload
        }
   }
});

export default slice.reducer;

export const {setData, resetData, MapMarker} = slice.actions