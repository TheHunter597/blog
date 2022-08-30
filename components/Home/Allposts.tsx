import styles from "./Allposts.module.scss";
import HomePost from "./HomePost/HomePost";
import { headerPosts } from "../../utilitis/types";

interface props {
  allPosts: {
    posts: headerPosts[];
  };
}

function Allposts(props: props) {
  let { allPosts } = props;
  let result = allPosts.posts.map((entry) => {
    return <HomePost data={entry} key={entry.title} />;
  });
  return <div className={styles.Allposts}>{result}</div>;
}

export default Allposts;
