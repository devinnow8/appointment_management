import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rescheduleAppointment: {},
  isLoading: false,
};

export const rescheduleAppointmentSlice = createSlice({
  name: "rescheduleAppointmentSlice",
  initialState,
  reducers: {
    rescheduleAppointmentFetchRequest: {
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
    rescheduleAppointmentFetchSuccess: (state, action) => {
      state.rescheduleAppointment = action.payload;
      state.isLoading = false;
    },
    rescheduleAppointmentFetchFailure: (state) => {
      state.rescheduleAppointment = [];
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  rescheduleAppointmentFetchRequest,
  rescheduleAppointmentFetchSuccess,
  rescheduleAppointmentFetchFailure,
} = rescheduleAppointmentSlice.actions;

export default rescheduleAppointmentSlice.reducer;
