import { useState } from "react";
import { useDispatch } from "react-redux";
import { RootDispatch } from "../../redux";
import { removeComment } from "../../redux/comments";
import styles from "./Modal.module.scss";
import { ClipLoader } from "react-spinners";
import { comment } from "./Comments";
interface props {
  commentId: string;
  active: boolean;
  setPopup: Function;
  setCurrentComments: Function;
}

function Modal(props: props) {
  const { commentId, setPopup, setCurrentComments } = props;
  const [status, setStatus] = useState<"IDLE" | "DELETING">("IDLE");
  const dispatch: RootDispatch = useDispatch();
  function deleteComment() {
    setStatus("DELETING");
    setPopup((prev: { active: boolean; commentId: string }) => {
      return { ...prev, active: false };
    });
    setTimeout(() => {
      setStatus("IDLE");
    }, 1000);
    dispatch(removeComment(commentId));
    setCurrentComments((prev: comment[]) => {
      return prev.filter((comment) => comment.id !== commentId);
    });
  }
  return (
    <div className={styles["Modal"]}>
      {status === "IDLE" ? (
        <>
          <p>
            Are you sure you want to delete the comment this process cant be
            undo{" "}
          </p>
          <div>
            <button
              onClick={() => {
                deleteComment();
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setPopup(false);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <ClipLoader size={70} />
      )}
    </div>
  );
}

export default Modal;
