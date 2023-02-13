import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceList: [],
  isLoading: false,
};

export const serviceListSlice = createSlice({
  name: "serviceListSlice",
  initialState,
  reducers: {
    serviceListFetchRequest: {
      reducer: (state) => {
        state.isLoading = true;
      },
      prepare: (requestBody) => {
        return {
          payload: {
            requestBody,
          },
        };
      },
    },
    serviceListFetchSuccess: (state, action) => {
      state.serviceList = action.payload;
      state.isLoading = false;
    },
    serviceListFetchFailure: (state) => {
      state.serviceList = [];
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  serviceListFetchRequest,
  serviceListFetchSuccess,
  serviceListFetchFailure,
} = serviceListSlice.actions;

export default serviceListSlice.reducer;
