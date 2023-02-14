import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentBookedPdf: "",
  appointmentBookedChecklist: "",
  details: {},
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

    appointmentBookedDetailsRequest: {
      reducer: (state) => {},
      prepare: (id, success, error) => {
        return {
          payload: { id, success, error },
        };
      },
    },
    appointmentBookedDetailsFetchSuccess: (state, action) => {
      state.details = action.payload;
    },
    appointmentBookedDetailsFetchFailure: (state) => {
      state.details = "";
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
  appointmentBookedDetailsRequest,
  appointmentBookedDetailsFetchSuccess,
  appointmentBookedDetailsFetchFailure,
} = appointmentBookedSlice.actions;

export default appointmentBookedSlice.reducer;
