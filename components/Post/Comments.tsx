import styles from "./Comments.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch } from "../../redux";
import { SignedInEmail, signedInData } from "../../redux/signedIn";
import { commentsData, changeUpdatingStatus } from "../../redux/comments";
import SingleComment from "./SingleComment";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useRef, useState } from "react";
export interface comment {
  publishedAt: string;
  id: string;
  comment: string;
  userdatabase: {
    email: string;
  };
}
interface props {
  slug: string;
  comments: comment[];
}
import {
  addComment,
  updateComment,
  changeCurrentCommentMessage,
} from "../../redux/comments";
import Modal from "./Modal";
import { getPostComments } from "../../data/getPostComments";
function Comments(props: props) {
  const dispatch: RootDispatch = useDispatch();
  const commentsState = useSelector(commentsData);
  const commentInput = useRef<HTMLTextAreaElement>(null);
  const userEmail = useSelector(SignedInEmail);
  const signedIn = useSelector(signedInData);
  const [currentComments, setCurrentComments] = useState<comment[]>([]);
  const [popup, setPopup] = useState<{
    active: boolean;
    commentId: string;
  }>({ active: false, commentId: "" });
  console.log(currentComments);

  useEffect(() => {
    async function getData() {
      const data = await getPostComments(props.slug);
      setCurrentComments(data.post.comments);
    }
    getData();
  }, []);

  function currentActiveComments() {
    if (currentComments.length != 0) {
      return currentComments;
    } else {
      return props.comments;
    }
  }
  const allComments = currentActiveComments().map((comment) => {
    return (
      <SingleComment
        {...comment}
        key={comment.id}
        popup={popup}
        setPopup={setPopup}
      />
    );
  });

  function addNewComment() {
    const data = {
      comment: commentInput.current!.value,
      email: userEmail ? userEmail : "",
      slug: props.slug,
    };
    setTimeout(() => {
      commentInput.current!.value = "";
    }, 1);
    setTimeout(() => {
      dispatch(changeCurrentCommentMessage(""));
    }, 10000);
    dispatch(addComment(data));
  }

  function updateCurrentComment() {
    setTimeout(() => {
      commentInput.current!.value = "";
    }, 1);
    setTimeout(() => {
      dispatch(changeCurrentCommentMessage(""));
    }, 1000);
    dispatch(
      updateComment({
        comment: commentInput.current!.value,
        id: commentsState.updatingCommentData.id,
      })
    );
    setCurrentComments((prev) => {
      const result = prev.map((comment) =>
        comment.id === commentsState.updatingCommentData.id
          ? { ...comment, comment: commentInput.current!.value }
          : comment
      );

      return result;
    });
  }

  useEffect(() => {
    commentInput.current!.value = commentsState.updatingCommentData.comment;
  }, [commentsState.updatingCommentData.comment]);
  return (
    <div className={styles["Comments"]} id="Comments">
      <h3>Comments({currentActiveComments().length})</h3>
      <div className={styles["Comments__content"]}>
        <h4>
          Writing as <span>{userEmail}</span>
        </h4>
        {popup.active && (
          <Modal
            {...popup}
            setPopup={setPopup}
            setCurrentComments={setCurrentComments}
          />
        )}
        <textarea placeholder="Enter your comment" ref={commentInput} />
        <small
          className={`${styles["Comments__warning"]}
            ${
              styles[
                `Comments__warning${
                  commentsState.currentCommentMessage.slice(0, 7) === "Comment"
                    ? "--sucess"
                    : "--fail"
                }`
              ]
            }
          `}
        >
          {commentsState.postingCommentStatus !== "LOADING" &&
          commentsState.updatingCommentStatus != "UPDATING" ? (
            commentsState.currentCommentMessage
          ) : (
            <ClipLoader size={80} />
          )}
        </small>
        <div className={styles["Comments__addNewComment"]}>
          <button onClick={() => (commentInput.current!.value = "")}>
            Cancel
          </button>
          <button
            onClick={() => {
              if (
                signedIn.isSignedIn &&
                commentsState.updatingCommentStatus == "IDLE"
              ) {
                addNewComment();
              } else if (
                signedIn.isSignedIn &&
                commentsState.updatingCommentStatus === "WAITING"
              ) {
                updateCurrentComment();
                dispatch(changeUpdatingStatus("UPDATING"));
                setTimeout(() => {
                  dispatch(changeUpdatingStatus("IDLE"));
                }, 1000);
                dispatch(
                  changeCurrentCommentMessage("Comment updated Sucessfully")
                );
              } else {
                setTimeout(() => {
                  dispatch(changeCurrentCommentMessage(""));
                }, 5000);
                dispatch(
                  changeCurrentCommentMessage(
                    "You must sign in to write comments"
                  )
                );
              }
            }}
          >
            Confirm
          </button>
        </div>
        <div className={styles["Comments__comments"]}>{allComments}</div>
      </div>
    </div>
  );
}

export default Comments;
