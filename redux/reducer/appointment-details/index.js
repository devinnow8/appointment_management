import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentDetails: {},
};

export const appointmentDetailsSlice = createSlice({
  name: "appointmentDetailsSlice",
  initialState,
  reducers: {
    appointmentDetailsFetchRequest: {
      reducer: (state) => {},
      prepare: (requestBody) => {
        return {
          payload: { requestBody },
        };
      },
    },
    appointmentDetailsFetchSuccess: (state, action) => {
      state.appointmentDetails = action.payload;
    },
    appointmentDetailsFetchFailure: (state, action) => {
      state.appointmentDetails = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  appointmentDetailsFetchRequest,
  appointmentDetailsFetchSuccess,
  appointmentDetailsFetchFailure
} = appointmentDetailsSlice.actions;

export default appointmentDetailsSlice.reducer;
