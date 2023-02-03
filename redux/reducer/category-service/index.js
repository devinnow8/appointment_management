import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryServiceList: [],
  isLoading: false
};

export const categoryServiceListSlice = createSlice({
  name: "categoryServiceListSlice",
  initialState,
  reducers: {
    categoryServiceListFetchRequest: (state, action) => {
      state.categoryServiceList = [];
      state.isLoading = false
    },
    categoryServiceListFetchSuccess: (state, action) => {
      state.categoryServiceList = action.payload;
      state.isLoading = false
    },
    categoryServiceListFetchFailure: (state) => {
      state.categoryServiceList = [];
      state.isLoading = false
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  categoryServiceListFetchRequest,
  categoryServiceListFetchSuccess,
  categoryServiceListFetchFailure,
} = categoryServiceListSlice.actions;

export default categoryServiceListSlice.reducer;
