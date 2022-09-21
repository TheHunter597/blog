import { useState } from "react";
import styles from "./Sign.module.scss";
import SignUp from "../../components/sign/SignUp";
import SignIn from "../../components/sign/SignIn";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

function Sign() {
  const [signInUpSwitcher, setSignInUpSwitcher] = useState(false);
  const phoneUser = useSelector(
    (state: RootState) => state.generalInfo.phoneUser
  );
  const isSignedIn = useSelector(
    (state: RootState) => state.signedIn.isSignedIn
  );

  return (
    <div className={`${styles.Sign}`}>
      <Head>
        <title>Siging</title>
      </Head>
      {!isSignedIn ? (
        <div
          className={`${styles.Sign__content} ${
            !signInUpSwitcher ? styles.Sign__content_up : ""
          }`}
        >
          {!phoneUser || (phoneUser && !signInUpSwitcher) ? (
            <SignUp setSignInUpSwitcher={setSignInUpSwitcher} />
          ) : (
            ""
          )}
          {!phoneUser || (phoneUser && signInUpSwitcher) ? (
            <SignIn setSignInUpSwitcher={setSignInUpSwitcher} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className={styles["Sign__alreadySigned"]}>
          You are already signed In
        </div>
      )}
    </div>
  );
}

export default Sign;
