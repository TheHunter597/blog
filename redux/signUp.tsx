import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface initialState {
  SignUpUsername: string;
  SignUpPassword: string;
  SignUpEmail: string;
  SignUpUsernameError: boolean;
  SignUpPasswordError: boolean;
  SignUpEmailError: boolean;
  SignUpErrorMessage: string;
}

const initialState: initialState = {
  SignUpUsername: "",
  SignUpPassword: "",
  SignUpEmail: "",
  SignUpUsernameError: false,
  SignUpPasswordError: false,
  SignUpEmailError: false,
  SignUpErrorMessage: "",
};

const signUpReducer = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    changeSignUpUsername(state, action) {
      state.SignUpUsername = action.payload;
    },
    changeSignUpPassword(state, action) {
      state.SignUpPassword = action.payload;
    },
    changeSignUpEmail(state, action) {
      state.SignUpEmail = action.payload;
    },
    changeSignUpUsernameError(state, action) {
      state.SignUpUsernameError = action.payload;
    },
    changeSignUpPasswordError(state, action) {
      state.SignUpPasswordError = action.payload;
    },
    changeSignUpEmailError(state, action) {
      state.SignUpEmailError = action.payload;
    },
    changeSignUpErrorMessage(state, action) {
      state.SignUpErrorMessage = action.payload;
    },
  },
});

export const {
  changeSignUpUsername,
  changeSignUpPassword,
  changeSignUpEmail,
  changeSignUpUsernameError,
  changeSignUpPasswordError,
  changeSignUpEmailError,
  changeSignUpErrorMessage,
} = signUpReducer.actions;

export const signUpData = (state: RootState) => state.signUp;

export default signUpReducer.reducer;
