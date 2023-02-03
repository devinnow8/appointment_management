import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicationDetails: {},
  memberDetails: [],
  isLoading: false,
};

export const applicationDetailsSlice = createSlice({
  name: "applicationDetailsSlice",
  initialState,
  reducers: {
    applicationDetailsFetchRequest: {
      reducer: (state) => {
        state.isLoading = true
      },
      prepare: (requestBody, successCalback) => {
        return {
          payload: { requestBody, successCalback },
        };
      },
    },
    applicationDetailsFetchSuccess: (state, action) => {
      state.applicationDetails = action.payload;
      state.isLoading = false
    },
    applicationDetailsFetchMemberSuccess: (state, action) => {
      state.memberDetails = action.payload;
      state.isLoading = false
    },
    applicationDetailsFetchFailure: (state) => {
      state.applicationDetails = [];
      state.isLoading = false
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  applicationDetailsFetchRequest,
  applicationDetailsFetchSuccess,
  applicationDetailsFetchMemberSuccess,
  applicationDetailsFetchFailure,
} = applicationDetailsSlice.actions;

export default applicationDetailsSlice.reducer;
