import { createSlice } from '@reduxjs/toolkit';
type Notiffication = {
  type: 'info' | 'success';
  text: string;
  title: string;
  show: boolean;
};
const initialState: Notiffication = {
  type: 'info',
  text: '',
  title: '',
  show: false,
};
export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state = action.payload;
      return state;
    },
    hideNotifivation: (state) => {
      state.show = false;
      return state;
    },
  },
});

export default notificationSlice.reducer;
export const { setNotification, hideNotifivation } = notificationSlice.actions;
