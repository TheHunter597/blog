import styles from "./SingleComment.module.scss";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { signedInData } from "../../redux/signedIn";
import { useRouter } from "next/router";
import { changeUpdatingData, changeUpdatingStatus } from "../../redux/comments";
import { RootDispatch } from "../../redux";

interface props {
  comment: string;
  publishedAt: string;
  id: string;
  userdatabase: {
    email: string;
  };
  popup: { active: boolean; commentId: string };
  setPopup: Function;
}

function SingleComment(props: props) {
  const {
    publishedAt,
    comment,
    id,
    userdatabase: { email },
    setPopup,
  } = props;
  const date = new Date(publishedAt).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const dispatch: RootDispatch = useDispatch();
  const signedIn = useSelector(signedInData);
  const router = useRouter();
  return (
    <div className={styles["SingleComment"]}>
      <div className={styles["SingleComment__content"]}>
        <div className={styles["SingleComment__info"]}>
          <h4>{email}</h4>
          <span>&nbsp; {date}</span>
        </div>
        <p>{comment.charAt(0).toLocaleUpperCase() + comment.slice(1)}</p>
        <div className={styles["SingleComment__modifications"]}>
          {signedIn.isSignedIn && signedIn.email === email ? (
            <>
              <span
                onClick={() => {
                  setPopup(
                    (prev: {
                      active: boolean;
                      commentId: string;
                      type: "DELETE";
                    }) => {
                      return {
                        active: !prev.active,
                        commentId: id,
                        type: "DELETE",
                      };
                    }
                  );
                }}
              >
                <AiFillDelete />
              </span>
              <span
                onClick={() => {
                  dispatch(changeUpdatingStatus("WAITING"));
                  dispatch(changeUpdatingData({ id, comment }));
                  const { categorySlug, postSlug } = router.query;

                  setTimeout(() => {
                    router.push(`/${categorySlug}/${postSlug}/#Comments`);
                  }, 1);
                }}
              >
                <BsFillPencilFill />
              </span>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
