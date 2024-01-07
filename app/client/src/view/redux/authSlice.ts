import { createSlice } from "@reduxjs/toolkit";
import AuthController from "../../lib/controller/authController";

type AuthState = {
  value: string | null;
};

const authController = new AuthController();

const initialState: AuthState = {
  value: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    check: (state) => {
      const token = authController.check();
      state.value = token;
    },
  },
});

export const { check } = authSlice.actions;
export default authSlice.reducer;
