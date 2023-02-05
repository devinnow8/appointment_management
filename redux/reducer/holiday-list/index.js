import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  holidayList: [],
  isLoading: false
};

export const holidayListSlice = createSlice({
  name: 'holidayListSlice',
  initialState,
  reducers: {
    holidayListFetchRequest: {
      reducer: state => {
        state.isLoading = true
      },
      prepare: requestBody => {
        return {
          payload: { requestBody }
        };
      }
    },
    holidayListFetchSuccess: (state, action) => {
      state.holidayList = action.payload;
      state.isLoading = false
    },
    holidayListFetchFailure: state => {
      state.holidayList = [];
      state.isLoading = false
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
