import styles from "./post.module.scss";
import { getCategoriesData } from "../../../data/getCategoriesData";
import { headerPosts } from "../../../utilitis/types";
import { getPostData } from "../../../data/getPostData";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import context from "../../../context/context";
import { actionTypes, contextType } from "../../../utilitis/types";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
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
      slug: string;
      content: {
        html: string;
      };
      coverImage: { url: string };
      author: { name: string; picture: { url: string } | null };
    };
  };
}

function Post(props: props) {
  const contextData = useContext(context);
  const { state, dispatch } = contextData as contextType;
  let { data } = props;
  const { coverImage, title, date, content, author, slug } = data.post;
  const [favourited, setFavourited] = useState(false);

  useEffect(() => {
    if (state.signedIn.favs != null) {
      let fav = state.signedIn.favs.some((entry) => entry.slug === slug);
      setFavourited(fav);
    }
  });

  useEffect(() => {
    document.querySelector("#content")!.innerHTML = content.html;
  });

  const shownTitle = title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1) + " ")
    .concat();

  return (
    <>
      <Head>
        <title>{data.post.title}</title>
      </Head>
      <div className={`${styles.Post} ${styles.container}`}>
        {state.signedIn.isSignedIn ? (
          <div
            className={styles.Post__addFav}
            onClick={() => {
              let duplicate = state.signedIn.favs.some((entry) => {
                return entry.slug === slug;
              });

              if (!duplicate) {
                dispatch({
                  type: actionTypes.ADD_FAVS_LIST,
                  value: { title, slug },
                });

                const result = fetch("/api/addToFavList", {
                  method: "POST",
                  body: JSON.stringify({
                    email: state.signedIn.email,
                    slug: slug,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }).then((res) => {
                  return res;
                });
              } else {
                dispatch({
                  type: actionTypes.REMOVE_FAVS_LIST,
                  value: state.signedIn.favs.filter((entry) => {
                    return entry.slug != slug;
                  }),
                });
                const result = fetch("/api/removeFromFavList", {
                  method: "POST",
                  body: JSON.stringify({
                    email: state.signedIn.email,
                    slug: slug,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }).then((res) => {
                  return res;
                });
              }
            }}
          >
            {favourited ? (
              <figure>
                <AiFillStar />
              </figure>
            ) : (
              <figure>
                <AiOutlineStar />
              </figure>
            )}
          </div>
        ) : (
          ""
        )}
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
