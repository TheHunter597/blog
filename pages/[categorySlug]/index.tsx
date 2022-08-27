import { getCategoriesData } from "../../data/getCategoriesData";
import styles from "./Category.module.scss";
import { headerPosts, contextType, actionTypes } from "../../utilitis/types";
import HomePost from "../../components/Home/HomePost/HomePost";
import { getCategoryData } from "../../data/getCategoryData";
import Head from "next/head";
import { useContext, useEffect } from "react";
import context from "../../context/context";

interface category {
  slug: string;
  name: string;
  posts: headerPosts[];
}

interface props {
  categoryData: {
    category: {
      name: string;
      posts: headerPosts[];
    };
  };
}
function Category(props: props) {
  let { categoryData } = props;
  const contextData = useContext(context) as contextType;
  const { state, dispatch } = contextData;

  const result = categoryData.category.posts.map((post: headerPosts) => {
    return <HomePost data={post} key={post.title} />;
  });

  return (
    <>
      <Head>
        <title>{categoryData.category.name}</title>
      </Head>
      <div className={styles.Category}>{result}</div>
    </>
  );
}

export async function getStaticPaths() {
  let result = (await getCategoriesData()) || [];
  let paths = result.categories.map((category: category) => {
    return {
      params: {
        categorySlug: category.slug,
      },
    };
  });

  return {
    fallback: false,
    paths: paths,
  };
}

export async function getStaticProps(context: any) {
  let result = (await getCategoryData(context.params.categorySlug)) || [];

  return {
    props: {
      categoryData: result,
    },
    revalidate: 30,
  };
}

export default Category;
