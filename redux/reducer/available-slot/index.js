import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  availableSlotList: [],
  isLoadingSlot: false,
};

export const availableSlotListSlice = createSlice({
  name: "availableSlotListSlice",
  initialState,
  reducers: {
    availableSlotListFetchRequest: {
      reducer: (state) => {
        state.isLoadingSlot = true;
      },
      prepare: (requestBody) => {
        return {
          payload: { requestBody },
        };
      },
    },
    availableSlotListFetchSuccess: (state, action) => {
      state.availableSlotList = action.payload;
      state.isLoadingSlot = false;
    },
    availableSlotListFetchFailure: (state) => {
      state.availableSlotList = [];
      state.isLoadingSlot = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  availableSlotListFetchRequest,
  availableSlotListFetchSuccess,
  availableSlotListFetchFailure,
} = availableSlotListSlice.actions;

export default availableSlotListSlice.reducer;
