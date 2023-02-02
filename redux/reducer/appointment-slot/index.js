import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentSlotList: [],
};

export const appointmentSlotListSlice = createSlice({
  name: "appointmentSlotListSlice",
  initialState,
  reducers: {
    appointmentSlotListFetchRequest: {
      reducer: (state) => {},
      prepare: (requestBody) => {
        return {
          payload: { requestBody },
        };
      },
    },
    appointmentSlotListFetchSuccess: (state, action) => {
      state.appointmentSlotList = action.payload;
    },
    appointmentSlotListFetchFailure: (state) => {
      state.appointmentSlotList = [];
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
