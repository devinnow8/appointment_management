import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryServiceList: [],
};

export const categoryServiceListSlice = createSlice({
  name: "categoryServiceListSlice",
  initialState,
  reducers: {
    categoryServiceListFetchRequest: (state, action) => {
      state.categoryServiceList.push(action.payload);
    },
    categoryServiceListFetchSuccess: (state, action) => {
      state.categoryServiceList = action.payload;
    },
    categoryServiceListFetchFailure: (state) => {
      state.categoryServiceList = [];
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
