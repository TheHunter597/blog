import styles from "./favs.module.scss";
import context from "../../context/context";
import { contextType } from "../../utilitis/types";
import { useContext } from "react";
import HomePost from "../../components/Home/HomePost/HomePost";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSelector } from "react-redux";
import { signedInData } from "../../redux/signedIn";

function Favs() {
  const router = useRouter();
  const signedInState = useSelector(signedInData);
  const result = signedInState.favs.map((entry) => {
    return <HomePost data={entry} key={entry.coverImage.url} />;
  });
  return (
    <div className={styles.Favs}>
      <Head>
        <title>favs</title>
      </Head>
      {signedInState.isSignedIn ? (
        <>
          <h2>Your Favourite List</h2>
          {result.length < 1 ? (
            <h4>
              No posts are added you can add a post from the small star at the
              top of every article
            </h4>
          ) : (
            ""
          )}
          <div className={styles.Favs__content}>{result}</div>
        </>
      ) : (
        <h2>
          <span onClick={() => router.push("/sign")}>Sign in</span> to access
          your favourite list
        </h2>
      )}
    </div>
  );
}

export default Favs;
