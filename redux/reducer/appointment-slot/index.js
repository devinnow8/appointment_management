import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentSlotList: [],
  isLoadingSlot: false
};

export const appointmentSlotListSlice = createSlice({
  name: "appointmentSlotListSlice",
  initialState,
  reducers: {
    appointmentSlotListFetchRequest: {
      reducer: (state) => {
        state.isLoadingSlot = true;
      },
      prepare: (requestBody, successCallback) => {
        return {
          payload: { requestBody, successCallback },
        };
      },
    },
    appointmentSlotListFetchSuccess: (state, action) => {
      state.appointmentSlotList = action.payload;
      state.isLoadingSlot = false

    },
    appointmentSlotListFetchFailure: (state) => {
      state.appointmentSlotList = [];
      state.isLoadingSlot = false

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
