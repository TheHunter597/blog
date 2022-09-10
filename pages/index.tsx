import Header from "../components/Home/Header";
import { getLatestPosts } from "../data/getLatestPosts";
import styles from "./Home.module.scss";
import { headerPosts } from "../utilitis/types";
import Welcome from "../components/Home/Welcome";
import Allposts from "../components/Home/Allposts";
import { getPostsData } from "../data/getPostsData";
import Head from "next/head";
import { useEffect } from "react";
import {
  changeSignedInUsername,
  changeSignedInEmail,
  changeIsSignedIn,
  changeSignedInFavs,
} from "../redux/signedIn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";

interface props {
  latestPosts: headerPosts[];
  allPosts: {
    posts: headerPosts[];
  };
  categoriesData: { name: string; slug: string }[];
}

function Home(props: props) {
  let { latestPosts, allPosts } = props;
  const dispatch = useDispatch();
  const signedIn = useSelector((state: RootState) => state.signedIn.isSignedIn);
  useEffect(() => {
    if (localStorage.getItem("SignedIn") == "true") {
      dispatch(changeIsSignedIn(true));
      dispatch(changeSignedInUsername(localStorage.getItem("Username")));
      dispatch(changeSignedInEmail(localStorage.getItem("Email")));
      dispatch(
        changeSignedInFavs(
          JSON.parse(localStorage.getItem("favs") as string) === null
            ? []
            : JSON.parse(localStorage.getItem("favs") as string)
        )
      );
    }
  }, [signedIn, dispatch]);
  return (
    <>
      <Head>
        <title>Meine Blog</title>
      </Head>
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
    </>
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
    revalidate: 30,
  };
}

export default Home;
