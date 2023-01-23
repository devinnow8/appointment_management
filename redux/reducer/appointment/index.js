import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointment: []
};

export const appointmentScheduleSlice = createSlice({
  name: 'appointmentScheduleSlice',
  initialState,
  reducers: {
    appointmentScheduleFetchRequest: {
      reducer: state => {},
      prepare: requestBody => {
        return {
          payload: { requestBody }
        };
      }
    },
    appointmentScheduleFetchSuccess: (state, action) => {
      state.holidayList = action.payload;
    },
    appointmentScheduleFetchFailure: state => {
      state.holidayList = [];
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
