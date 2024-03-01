// EXAMPLE, DELETE AFTER IMPLEMENTING WITH DATABASE

import { createSlice } from "@reduxjs/toolkit";

interface ISettingsState {
  resetPhoneNumberStep: number;
}

const initialState: ISettingsState = {
  resetPhoneNumberStep: 0,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setResetPhoneNumberStep(state, action) {
      state.resetPhoneNumberStep = action.payload;
      return state;
    },
  },
});

export const { setResetPhoneNumberStep } = settingsSlice.actions;

export default settingsSlice;
