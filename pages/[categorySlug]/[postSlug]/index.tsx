import styles from "./post.module.scss";
import { getCategoriesData } from "../../../data/getCategoriesData";
import { getPostData } from "../../../data/getPostData";
import { useEffect, useState } from "react";
import Head from "next/head";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { changeSignedInFavs, signedInData } from "../../../redux/signedIn";
import { headerPosts } from "../../../redux/generalInfo";

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
      categories: [];
      coverImage: { url: string };
      author: { name: string; picture: { url: string } | null };
    };
  };
}

function Post(props: props) {
  const signedInState = useSelector(signedInData);
  let { data } = props;
  const {
    coverImage,
    title,
    date,
    content,
    author,
    slug,
    excerpt,
    categories,
  } = data.post;
  const [favourited, setFavourited] = useState(false);

  useEffect(() => {
    if (signedInState.favs != null) {
      let fav = signedInState.favs.some((entry) => entry.slug === slug);
      setFavourited(fav);
    }
  }, [slug, signedInState.favs]);

  useEffect(() => {
    document.querySelector("#content")!.innerHTML = content.html;
  });
  const dispatch = useDispatch();

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
        {signedInState.isSignedIn ? (
          <div
            className={styles.Post__addFav}
            onClick={() => {
              let duplicate = signedInState.favs.some((entry) => {
                return entry.slug === slug;
              });

              if (!duplicate) {
                let newList = [
                  ...signedInState.favs,
                  { title, slug, categories, coverImage, excerpt },
                ];
                dispatch(changeSignedInFavs(newList));
                localStorage.setItem("favs", JSON.stringify(newList));
                const result = fetch("/api/addToFavList", {
                  method: "POST",
                  body: JSON.stringify({
                    email: signedInState.email,
                    slug: slug,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }).then((res) => {
                  return res;
                });
              } else {
                const newList = signedInState.favs.filter((entry) => {
                  return entry.slug != slug;
                });
                dispatch(changeSignedInFavs(newList));
                localStorage.setItem("favs", JSON.stringify(newList));

                const result = fetch("/api/removeFromFavList", {
                  method: "POST",
                  body: JSON.stringify({
                    email: signedInState.email,
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
              <Image
                src={author.picture != null ? author.picture.url : ""}
                alt="author picture"
                height={50}
                width={50}
              />
            ) : (
              ""
            )}
            <p>Written By {author.name}</p>
            <span>{date}</span>
          </div>
        </div>
        <div className={styles.Post__image}>
          <Image
            src={coverImage.url}
            alt="cover Images"
            height={800}
            width={1400}
          />
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
