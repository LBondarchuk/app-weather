import { createSlice } from '@reduxjs/toolkit';
import { PersonInterface } from '../../../utils/types/PrersonInterface';
const initialState: PersonInterface[] = [];
export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeoples: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export default peopleSlice.reducer;
export const { setPeoples } = peopleSlice.actions;
