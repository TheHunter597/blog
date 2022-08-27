import { useRouter } from "next/router";
import { headerPosts } from "../../../utilitis/types";
import styles from "./HomePost.module.scss";
import context from "../../../context/context";
import { actionTypes, contextType } from "../../../utilitis/types";
import { useContext } from "react";
interface props {
  data: headerPosts;
}

function HomePost(props: props) {
  const router = useRouter();
  const { data } = props;
  const contextData = useContext(context) as contextType;
  const { state } = contextData;
  const { title, coverImage, excerpt, slug, categories } = data;
  return (
    <div
      className={styles.HomePost}
      onClick={() => router.push(`/${categories[0].slug}/${slug}`)}
    >
      <img
        src={coverImage ? coverImage.url : ""}
        className={styles.HomePost__image}
      ></img>
      <h3>{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
      <div className={styles.HomePost__description}>
        <h4>{!state.phoneUser ? excerpt : ""}</h4>
      </div>
    </div>
  );
}

export default HomePost;
