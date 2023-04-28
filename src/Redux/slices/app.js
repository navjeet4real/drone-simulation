import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeSeriesData: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
        setData(state, action){
            state.timeSeriesData  = action.payload
        },
        resetData(state, action){
            console.log(state.timeSeriesData, "ffffffffffffffff", action.payload)
            state.timeSeriesData = action.payload
        }
   }
});

export default slice.reducer;

export const {setData, resetData} = slice.actions