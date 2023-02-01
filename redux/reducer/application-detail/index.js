import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicationDetails: {},

  memberDetails: [],
};

export const applicationDetailsSlice = createSlice({
  name: "applicationDetailsSlice",
  initialState,
  reducers: {
    applicationDetailsFetchRequest: {
      reducer: (state) => {},
      prepare: (requestBody, successCalback, errorCallback) => {
        return {
          payload: { requestBody, successCalback, errorCallback },
        };
      },
    },
    applicationDetailsFetchSuccess: (state, action) => {
      state.applicationDetails = action.payload;
    },
    applicationDetailsFetchMemberSuccess: (state, action) => {
      let data = [];
      data.push(...state.memberDetails, action.payload);
      state.memberDetails = data;
    },
    applicationDetailsFetchFailure: (state) => {
      state.applicationDetails = [];
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
