import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface initialState {
  isSignedIn: boolean;
  username: string | null;
  email: string | null;
  favs:
    | {
        slug: string;
        title: string;
        excerpt: string;
        categories: [{ slug: string }];
        coverImage: { url: string };
      }[];
}

const initialState: initialState = {
  isSignedIn: false,
  username: "",
  email: "",
  favs: [],
};

const SignedInReducer = createSlice({
  name: "signedIn",
  initialState,
  reducers: {
    changeIsSignedIn(state, action: PayloadAction<boolean>) {
      state.isSignedIn = action.payload;
    },
    changeSignedInUsername(state, action: PayloadAction<string | null>) {
      state.username = action.payload;
    },
    changeSignedInEmail(state, action: PayloadAction<string | null>) {
      state.email = action.payload;
    },
    changeSignedInFavs(state, action) {
      state.favs = action.payload;
    },
  },
});

export const {
  changeSignedInUsername,
  changeSignedInEmail,
  changeIsSignedIn,
  changeSignedInFavs,
} = SignedInReducer.actions;

export const signedInData = (state: RootState) => state.signedIn;

export default SignedInReducer.reducer;
