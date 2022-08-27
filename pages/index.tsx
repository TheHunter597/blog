import Header from "../components/Home/Header";
import { getLatestPosts } from "../data/getLatestPosts";
import styles from "./Home.module.scss";
import { actionTypes, headerPosts, contextType } from "../utilitis/types";
import Welcome from "../components/Home/Welcome";
import Allposts from "../components/Home/Allposts";
import { getPostsData } from "../data/getPostsData";
import { getCategoriesData } from "../data/getCategoriesData";
import Head from "next/head";
import { useContext, useEffect } from "react";
import context from "../context/context";
interface props {
  latestPosts: headerPosts[];
  allPosts: {
    posts: headerPosts[];
  };
  categoriesData: { name: string; slug: string }[];
}

function Home(props: props) {
  let { latestPosts, allPosts, categoriesData } = props;

  const contextData = useContext(context) as contextType;
  const { state, dispatch } = contextData;
  useEffect(() => {
    dispatch({ type: actionTypes.CHANGE_POSTS, value: allPosts.posts });
    dispatch({
      type: actionTypes.CHANGE_CATEGORIES_DATA,
      value: categoriesData,
    });
  }, []);

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
  let categoriesData = (await getCategoriesData()) || [];
  return {
    props: {
      latestPosts: latestPosts.posts,
      allPosts: allPosts,
      categoriesData: categoriesData,
    },
  };
}

export default Home;
