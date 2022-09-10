import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { getCategoriesData } from "../data/getCategoriesData";
import { getPostsData } from "../data/getPostsData";

interface postsDataType {
  title: string;
  slug: string;
  excerpt: string;
  categories: { slug: string }[];
}
interface categoriesDataType {
  categories: { name: string; slug: string; posts: { excerpt: string }[] }[];
}
interface initialState {
  posts: postsDataType[];
  categories: categoriesDataType;
  phoneUser: boolean;
}
const initialState: initialState = {
  posts: [],
  categories: { categories: [] },
  phoneUser: false,
};

export const fetchAllPosts = createAsyncThunk(
  "generalInfo/fetchAllPosts",
  async () => {
    let allPosts = (await getPostsData()) || [];
    return allPosts.posts;
  }
);

export const fetchAllCategories = createAsyncThunk(
  "generalInfo/fetchAllCategories",
  async () => {
    let allCategories = (await getCategoriesData()) || [];
    return allCategories;
  }
);

const generalInfoReducer = createSlice({
  name: "generalInfo",
  initialState,
  reducers: {
    changePhoneUser(state, action: PayloadAction<boolean>) {
      state.phoneUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const generalInfoData = (state: RootState) => state.generalInfo;

export const { changePhoneUser } = generalInfoReducer.actions;

export default generalInfoReducer.reducer;
