import styles from "./post.module.scss";
import { getCategoriesData } from "../../../data/getCategoriesData";
import { headerPosts } from "../../../utilitis/types";
import { getPostData } from "../../../data/getPostData";
import { useEffect } from "react";
import Head from "next/head";

interface category {
  slug: string;
  name: string;
  posts: headerPosts[];
}

interface props {
  data: {
    post: {
      createdAt: string;
      date: string;
      excerpt: string;
      title: string;
      content: {
        html: string;
      };
      coverImage: { url: string };
      author: { name: string; picture: { url: string } | null };
    };
  };
}

function Post(props: props) {
  let { data } = props;
  const { coverImage, title, createdAt, date, excerpt, content, author } =
    data.post;

  useEffect(() => {
    document.querySelector("#content")!.innerHTML = content.html;
  });

  const shownTitle = title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1) + " ")
    .concat();
  console.log(content);

  return (
    <>
      <Head>
        <title>{data.post.title}</title>
      </Head>
      <div className={`${styles.Post} ${styles.container}`}>
        <div className={styles.Post__info}>
          <h3>{shownTitle}</h3>
          <div>
            {author != null ? (
              <img
                src={author.picture != null ? author.picture.url : ""}
                alt=""
              />
            ) : (
              ""
            )}
            <p>Written By {author.name}</p>
            <span>{date}</span>
          </div>
        </div>
        <div className={styles.Post__image}>
          <img alt="" src={coverImage.url} />
        </div>
        <div className={styles.Post__content}>
          <p id="content"></p>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  let result = (await getCategoriesData()) || [];
  let Allpaths: {}[] = [];
  let paths = result.categories.map((category: category) => {
    category.posts.map((post) =>
      Allpaths.push({
        params: { categorySlug: category.slug, postSlug: post.slug },
      })
    );
  });

  return {
    fallback: false,
    paths: Allpaths,
  };
}

export async function getStaticProps(context: any) {
  let result = (await getPostData(context.params.postSlug)) || [];

  return {
    props: {
      data: result,
    },
    revalidate: 30,
  };
}

export default Post;
