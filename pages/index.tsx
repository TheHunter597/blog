import Header from "../components/Home/Header";
import { getLatestPosts } from "../data/getLatestPosts";
import styles from "./Home.module.scss";
import { headerPosts } from "../utilitis/types";
import Welcome from "../components/Home/Welcome";
import Allposts from "../components/Home/Allposts";
import { getPostsData } from "../data/getPostsData";

interface props {
  latestPosts: headerPosts[];
  allPosts: {
    posts: headerPosts[];
  };
}

function Home(props: props) {
  let { latestPosts, allPosts } = props;
  return (
    <div className={styles.container}>
      <div className={styles.Home}>
        <div className={styles.Home__welcome}>
          <Welcome />
        </div>
        <div className={styles.Home__recentTitle}>
          <h2>Most Recent Posts</h2>
        </div>
        <div className={styles.Home__recent}>
          <Header headerPosts={latestPosts} />
        </div>
        <div className={styles.Home__allTitle}>
          <h2>All Posts</h2>
        </div>
        <div className={styles.Home__all}>
          <Allposts allPosts={allPosts} />
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps() {
  let latestPosts = (await getLatestPosts()) || [];
  let allPosts = (await getPostsData()) || [];
  return {
    props: {
      latestPosts: latestPosts.posts,
      allPosts: allPosts,
    },
  };
}

export default Home;
