import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentBookedPdf: "",
  appointmentBookedChecklist: "",
};

export const appointmentBookedSlice = createSlice({
  name: "appointmentBookedSlice",
  initialState,
  reducers: {
    appointmentBookedPdfRequest: {
      reducer: (state) => {},
      prepare: (id, success) => {
        return {
          payload: { id, success },
        };
      },
    },
    appointmentBookedPdfFetchSuccess: (state, action) => {
      state.appointmentBookedPdf = action.payload;
    },
    appointmentBookedPdfFetchFailure: (state) => {
      state.appointmentBookedPdfelAppointment = "";
    },

    appointmentBookedChecklistRequest: {
      reducer: (state) => {},
      prepare: (details, success) => {
        return {
          payload: { details, success },
        };
      },
    },
    appointmentBookedChecklistFetchSuccess: (state, action) => {
      state.appointmentBookedChecklist = action.payload;
    },
    appointmentBookedChecklistFetchFailure: (state) => {
      state.appointmentBookedChecklist = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  appointmentBookedPdfRequest,
  appointmentBookedPdfFetchSuccess,
  appointmentBookedPdfFetchFailure,
  appointmentBookedChecklistRequest,
  appointmentBookedChecklistFetchSuccess,
  appointmentBookedChecklistFetchFailure,
} = appointmentBookedSlice.actions;

export default appointmentBookedSlice.reducer;
