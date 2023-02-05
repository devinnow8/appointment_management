import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentSlotList: [],
  isLoading: false
};

export const appointmentSlotListSlice = createSlice({
  name: "appointmentSlotListSlice",
  initialState,
  reducers: {
    appointmentSlotListFetchRequest: {
      reducer: (state) => {
        state.isLoading = true;
      },
      prepare: (requestBody, successCallback) => {
        return {
          payload: { requestBody, successCallback },
        };
      },
    },
    appointmentSlotListFetchSuccess: (state, action) => {
      state.appointmentSlotList = action.payload;
      state.isLoading = false

    },
    appointmentSlotListFetchFailure: (state) => {
      state.appointmentSlotList = [];
      state.isLoading = false

    },
  },
});

// Action creators are generated for each case reducer function
export const {
  appointmentSlotListFetchRequest,
  appointmentSlotListFetchSuccess,
  appointmentSlotListFetchFailure,
} = appointmentSlotListSlice.actions;

export default appointmentSlotListSlice.reducer;
