import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cancelAppointment: "",
  isLoading: false,
};

export const cancelAppointmentSlice = createSlice({
  name: "cancelAppointmentSlice",
  initialState,
  reducers: {
    cancelAppointmentFetchRequest: {
      reducer: (state) => {
        state.isLoading = true;
      },
      prepare: (requestBody, successCalback) => {
        return {
          payload: {
            requestBody,
            successCalback,
          },
        };
      },
    },
    cancelAppointmentFetchSuccess: (state, action) => {
      state.cancelAppointment = action.payload;
      state.isLoading = false;
    },
    cancelAppointmentFetchFailure: (state) => {
      state.cancelAppointment = "";
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  cancelAppointmentFetchRequest,
  cancelAppointmentFetchSuccess,
  cancelAppointmentFetchFailure,
} = cancelAppointmentSlice.actions;

export default cancelAppointmentSlice.reducer;
