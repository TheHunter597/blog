import { configureStore } from "@reduxjs/toolkit";
import generalInfo from "./generalInfo";
import signIn from "./signIn";
import signUp from "./signUp";
import signedIn from "./signedIn";
import comments from "./comments";
const store = configureStore({
  reducer: {
    generalInfo,
    signIn,
    signUp,
    signedIn,
    comments,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

export default store;
