import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  holidayList: []
};

export const holidayListSlice = createSlice({
  name: 'holidayListSlice',
  initialState,
  reducers: {
    holidayListFetchRequest: (state, action) => {
      state.holidayList.push(action.payload);
    },
    holidayListFetchSuccess: (state, action) => {
      state.holidayList = action.payload;
    },
    holidayListFetchFailure: state => {
      state.holidayList = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const {
    holidayListFetchRequest,
    holidayListFetchSuccess,
    holidayListFetchFailure
} = holidayListSlice.actions;

export default holidayListSlice.reducer;
