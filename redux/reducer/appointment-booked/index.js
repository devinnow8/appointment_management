import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentBookedPdf: "",
};

export const appointmentBookedSlice = createSlice({
  name: "appointmentBookedSlice",
  initialState,
  reducers: {
    appointmentBookedPdfRequest: {
      reducer: (state) => {},
      prepare: (id) => {
        return {
          payload: { id },
        };
      },
    },
    appointmentBookedPdfFetchSuccess: (state, action) => {
      state.appointmentBookedPdf = action.payload;
    },
    appointmentBookedPdfFetchFailure: (state) => {
      state.appointmentBookedPdfelAppointment = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  appointmentBookedPdfRequest,
  appointmentBookedPdfFetchSuccess,
  appointmentBookedPdfFetchFailure,
} = appointmentBookedSlice.actions;

export default appointmentBookedSlice.reducer;
