import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SignInParams, StateData, StateType } from "../../lib/config/type";
import AuthController from "../../lib/controller/authController";

const authController = new AuthController();

const initialState: StateType<StateData> = {
  value: {
    loading: true,
    data: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    check: (state) => {
      state.value = { ...state.value, loading: true };
      const token = authController.check();
      state.value = { loading: false, data: token };
    },
    sign: (state, action: PayloadAction<SignInParams>) => {
      state.value = { ...state.value, loading: true };

      authController.sign(action.payload).then((result) => {
        state.value = { loading: false, data: result.token };
      });
    },
  },
});

export const { check, sign } = authSlice.actions;
export default authSlice.reducer;
