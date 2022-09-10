import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
interface initialState {
  SignInErrorMessage: string;
  SignInPasswordError: boolean;
  SignInEmailError: boolean;
}

const initialState: initialState = {
  SignInPasswordError: false,
  SignInEmailError: false,
  SignInErrorMessage: "",
};

const signInReducer = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    changeSignInPasswordError(state, action: PayloadAction<boolean>) {
      state.SignInPasswordError = action.payload;
    },
    changeSignInEmailError(state, action: PayloadAction<boolean>) {
      state.SignInEmailError = action.payload;
    },
    changeSignInErrorError(state, action: PayloadAction<string>) {
      state.SignInErrorMessage = action.payload;
    },
  },
});

export const signInData = (state: RootState) => state.signIn;

export const {
  changeSignInPasswordError,
  changeSignInEmailError,
  changeSignInErrorError,
} = signInReducer.actions;

export default signInReducer.reducer;
