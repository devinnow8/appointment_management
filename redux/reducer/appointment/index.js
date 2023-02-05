import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointment: [],
  isLoading: false
};

export const appointmentScheduleSlice = createSlice({
  name: 'appointmentScheduleSlice',
  initialState,
  reducers: {
    appointmentScheduleFetchRequest: {
      reducer: state => {
        state.isLoading = true
      },
      prepare: requestBody => {
        return {
          payload: { requestBody }
        };
      }
    },
    appointmentScheduleFetchSuccess: (state, action) => {
      state.holidayList = action.payload;
      state.isLoading = false
    },
    appointmentScheduleFetchFailure: state => {
      state.holidayList = [];
      state.isLoading = false
    }
  }
});

// Action creators are generated for each case reducer function
export const {
    appointmentScheduleFetchRequest,
    appointmentScheduleFetchSuccess,
    appointmentScheduleFetchFailure
} = appointmentScheduleSlice.actions;

export default appointmentScheduleSlice.reducer;
