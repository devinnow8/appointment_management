import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmOrder: {},
  appointmentOrder: {},
};

export const orderControllerSlice = createSlice({
  name: "orderControllerSlice",
  initialState,
  reducers: {
    appointmentOrderRequest: {
      reducer: (state) => {},
      prepare: (details, success, error) => {
        return {
          payload: { details, success, error },
        };
      },
    },
    appointmentOrderFetchSuccess: (state, action) => {
      state.appointmentOrder = action.payload;
    },
    appointmentOrderFetchFailure: (state) => {
      state.appointmentOrder = {};
    },

    confirmOrderRequest: {
      reducer: (state) => {},
      prepare: (details, success, error) => {
        return {
          payload: { details, success, error },
        };
      },
    },
    confirmOrderFetchSuccess: (state, action) => {
      state.confirmOrder = action.payload;
    },
    confirmOrderFetchFailure: (state) => {
      state.confirmOrder = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  appointmentOrderRequest,
  appointmentOrderFetchSuccess,
  appointmentOrderFetchFailure,
  confirmOrderRequest,
  confirmOrderFetchSuccess,
  confirmOrderFetchFailure,
} = orderControllerSlice.actions;

export default orderControllerSlice.reducer;
