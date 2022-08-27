import { getCategoriesData } from "../../data/getCategoriesData";
import styles from "./Category.module.scss";
import { headerPosts } from "../../utilitis/types";
import HomePost from "../../components/Home/HomePost/HomePost";
import { getCategoryData } from "../../data/getCategoryData";
interface category {
  slug: string;
  name: string;
  posts: headerPosts[];
}

interface props {
  category: {
    posts: headerPosts[];
  };
}
function Category(props: { categoryData: props }) {
  let { categoryData } = props;
  const result = categoryData.category.posts.map((post: headerPosts) => {
    return <HomePost data={post} key={post.title} />;
  });
  return <div className={styles.Category}>{result}</div>;
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
  };
}

export default Category;
