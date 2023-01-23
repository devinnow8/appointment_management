import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  centerList: []
};

export const centerListSlice = createSlice({
  name: 'centerListSlice',
  initialState,
  reducers: {
    centerListFetchRequest: (state, action) => {
      state.centerList.push(action.payload);
    },
    centerListFetchSuccess: (state, action) => {
      state.centerList = action.payload;
    },
    centerListFetchFailure: state => {
      state.centerList = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const {
    centerListFetchRequest,
    centerListFetchSuccess,
    centerListFetchFailure
} = centerListSlice.actions;

export default centerListSlice.reducer;
