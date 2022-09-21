import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface initialState {
  currentCommentError: boolean;
  currentCommentMessage: string;
  postingCommentStatus: "LOADING" | "FAILED" | "SUCESS" | "IDLE";
  updatingCommentStatus: "IDLE" | "WAITING" | "UPDATING";
  updatingCommentData: {
    id: string;
    comment: string;
  };
  userComments: {
    comment: string;
    createdAt: Date;
    userDatabase: { usename: string };
  }[];
}

const initialState = {
  currentCommentError: false,
  currentCommentMessage: "",
  postingCommentStatus: "IDLE",
  updatingCommentStatus: "IDLE",
  updatingCommentData: {
    id: "",
    comment: "",
  },
  userComments: [],
};

function validateComment(comment: string) {
  const insults = [/fuck/gi, /shit/gi, /\bhell\b/gi, /bitch/gi, /\bass\b/gi];
  let violation = false;
  for (let i = 0; i < insults.length; i++) {
    insults[i].test(comment) ? (violation = true) : "";
  }
  if (violation) {
    return true;
  } else {
    return false;
  }
}

export const addComment = createAsyncThunk(
  "Comments/addComment",
  async (
    data: { comment: string; email: string; slug: string },
    { rejectWithValue }
  ) => {
    const { comment } = data;
    const violation = validateComment(comment);
    if (comment.length < 5 || comment.length > 1000) {
      return rejectWithValue("The Comment should be between 5 and 1000 letter");
    } else if (violation) {
      return rejectWithValue(
        "Be polite and dont use bad words please try again"
      );
    }
    const result = await fetch("/api/Comment/addComment", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resultData = await result.json();
    const id = resultData.body.createComment.id;
    fetch("/api/Comment/publishComment", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resultData;
  }
);

export const updateComment = createAsyncThunk(
  "Comments/updateComment",
  async (data: { comment: string; id: string }, { rejectWithValue }) => {
    const result = fetch("/api/Comment/updateComment", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);

export const removeComment = createAsyncThunk(
  "Comments/removeComment",
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
const commentsReducer = createSlice({
  name: "Comments",
  initialState,
  reducers: {
    changeCurrentCommentError(state, action) {
      state.currentCommentError = action.payload;
    },
    changeCurrentCommentMessage(state, action) {
      state.currentCommentMessage = action.payload;
    },
    changeUpdatingStatus(state, action) {
      state.updatingCommentStatus = action.payload;
    },
    changeUpdatingData(state, action) {
      state.updatingCommentData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state, action) => {
        state.postingCommentStatus = "LOADING";
      })
      .addCase(addComment.rejected, (state, action) => {
        state.currentCommentError = true;
        state.currentCommentMessage = action.payload as string;
        state.postingCommentStatus = "FAILED";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.postingCommentStatus = "SUCESS";
        state.currentCommentMessage =
          "Comment posted and is being reviewed check again after couple of seconds ";
      });
    builder
      .addCase(updateComment.rejected, (state, action) => {
        state.currentCommentMessage = action.payload as string;
      })
      .addCase(updateComment.pending, (state, action) => {
        state.currentCommentMessage = "updating comment";
      });
  },
});

export const {
  changeCurrentCommentError,
  changeCurrentCommentMessage,
  changeUpdatingStatus,
  changeUpdatingData,
} = commentsReducer.actions;
export const commentsData = (state: RootState) => state.comments;
export default commentsReducer.reducer;
