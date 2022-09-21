import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface initialState {
  isSignedIn: boolean;
  username: string | null;
  email: string | null;
  favs: {
    slug: string;
    title: string;
    excerpt: string;
    categories: [{ slug: string }];
    coverImage: { url: string };
  }[];
  // comments: {
  //   currentCommentError: boolean;
  //   currentCommentErrorMessage: string;
  //   postingCommentStatus: "LOADING" | "FAILED" | "SUCESS" | "IDLE";
  //   userComments: {
  //     comment: string;
  //     createdAt: Date;
  //     userDatabase: { usename: string };
  //   }[];
  // };
}

const initialState: initialState = {
  isSignedIn: false,
  username: "",
  email: "",
  favs: [],
  // comments: {
  //   currentCommentError: false,
  //   currentCommentErrorMessage: "",
  //   postingCommentStatus: "IDLE",
  //   userComments: [],
  // },
};

// function validateComment(comment: string) {
//   const insults = [/fuck/gi, /shit/gi, /\bhell\b/gi, /bitch/gi, /\bass\b/gi];
//   let violation = false;
//   for (let i = 0; i < insults.length; i++) {
//     insults[i].test(comment) ? (violation = true) : "";
//   }
//   if (violation) {
//     return true;
//   } else {
//     return false;
//   }
// }

// export const addComment = createAsyncThunk(
//   "signedIn/addComment",
//   async (
//     data: { comment: string; email: string; slug: string },
//     { rejectWithValue }
//   ) => {
//     const { comment } = data;
//     const violation = validateComment(comment);
//     if (comment.length < 5 || comment.length > 1000) {
//       return rejectWithValue("The Comment should be between 5 and 1000 letter");
//     } else if (violation) {
//       return rejectWithValue(
//         "Be polite and dont use bad words please try again"
//       );
//     }
//     const result = await fetch("/api/Comment/addComment", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const resultData = await result.json();
//     const id = resultData.body.createComment.id;
//     fetch("/api/Comment/publishComment", {
//       method: "POST",
//       body: JSON.stringify({ id }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return resultData;
//   }
// );

// export const updateComment = createAsyncThunk(
//   "signedIn/updateComment",
//   async (data: { comment: string; id: string }, { rejectWithValue }) => {
//     // const { comment } = data;
//     // const violation = validateComment(comment);
//     // if (comment.length < 5 || comment.length > 1000) {
//     //   return rejectWithValue("The Comment should be between 5 and 1000 letter");
//     // } else if (violation) {
//     //   return rejectWithValue(
//     //     "Be polite and dont use bad words please try again"
//     //   );
//     // }
//     const result = fetch("/api/Comment/updateComment", {
//       method: "PATCH",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// );

export const removeComment = createAsyncThunk(
  "signedIn/removeComment",
  async (id: string) => {
    const result = await fetch("/api/Comment/removeComment", {
      body: JSON.stringify({ id }),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const outCome = result.json();
    console.log(outCome);
  }
);
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
    // changeCurrentCommentError(state, action) {
    //   state.comments.currentCommentError = action.payload;
    // },
    // changeCurrentCommentErrorMessage(state, action) {
    //   state.comments.currentCommentErrorMessage = action.payload;
    // },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(addComment.pending, (state, action) => {
  //       state.comments.postingCommentStatus = "LOADING";
  //     })
  //     .addCase(addComment.rejected, (state, action) => {
  //       state.comments.currentCommentError = true;
  //       state.comments.currentCommentErrorMessage = action.payload as string;
  //       state.comments.postingCommentStatus = "FAILED";
  //     })
  //     .addCase(addComment.fulfilled, (state, action) => {
  //       state.comments.postingCommentStatus = "SUCESS";
  //       state.comments.currentCommentErrorMessage =
  //         "Comment posted and is being reviewed check again after couple of seconds ";
  //       state.comments.userComments.push(action.payload);
  //     });
  //   builder.addCase(updateComment.rejected, (state, action) => {
  //     state.comments.currentCommentErrorMessage = action.payload as string;
  //   });
  //},
});

export const {
  changeSignedInUsername,
  changeSignedInEmail,
  changeIsSignedIn,
  changeSignedInFavs,
  // changeCurrentCommentError,
  // changeCurrentCommentErrorMessage,
} = SignedInReducer.actions;

export const signedInData = (state: RootState) => state.signedIn;
export const SignedInEmail = (state: RootState) => state.signedIn.email;

export default SignedInReducer.reducer;
