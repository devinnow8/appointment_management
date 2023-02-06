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
  },
});

// Action creators are generated for each case reducer function
export const {
  appointmentDetailsFetchRequest,
  appointmentDetailsFetchSuccess,
} = appointmentDetailsSlice.actions;

export default appointmentDetailsSlice.reducer;
