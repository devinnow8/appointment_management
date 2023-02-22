import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointment: [],
  isLoading: false,
};

export const appointmentScheduleSlice = createSlice({
  name: "appointmentScheduleSlice",
  initialState,
  reducers: {
    appointmentScheduleFetchRequest: {
      reducer: (state) => {
        state.isLoading = true;
      },
      prepare: (requestBody, successCalback, errorCallback) => {
        return {
          payload: { requestBody, successCalback, errorCallback },
        };
      },
    },
    appointmentScheduleFetchSuccess: (state, action) => {
      state.appointment = action.payload;
      state.isLoading = false;
    },
    appointmentScheduleFetchFailure: (state) => {
      state.appointment = {};
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  appointmentScheduleFetchRequest,
  appointmentScheduleFetchSuccess,
  appointmentScheduleFetchFailure,
} = appointmentScheduleSlice.actions;

export default appointmentScheduleSlice.reducer;
