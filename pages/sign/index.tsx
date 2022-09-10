import { useState } from "react";
import styles from "./Sign.module.scss";
import { auth } from "../../utilitis/firebase-config";
import * as EmailValidator from "email-validator";
import SignUp from "../../components/sign/SignUp";
import SignIn from "../../components/sign/SignIn";
import { getFavsList } from "../../data/getFavsList";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { getSignedInUserData } from "../../data/getSignedInUserData";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { RootDispatch, RootState } from "../../redux";
import {
  changeSignInPasswordError,
  changeSignInEmailError,
  changeSignInErrorError,
} from "../../redux/signIn";
import {
  changeSignUpUsernameError,
  changeSignUpPasswordError,
  changeSignUpEmailError,
  changeSignUpErrorMessage,
  signUpData,
  changeSignUpUsername,
  changeSignUpPassword,
  changeSignUpEmail,
} from "../../redux/signUp";
import {
  changeSignedInUsername,
  changeSignedInEmail,
  changeIsSignedIn,
  changeSignedInFavs,
} from "../../redux/signedIn";

function Sign() {
  const [signInUpSwitcher, setSignInUpSwitcher] = useState(false);
  const dispatch: RootDispatch = useDispatch();
  const phoneUser = useSelector(
    (state: RootState) => state.generalInfo.phoneUser
  );
  const signUpState = useSelector(signUpData);
  const isSignedIn = useSelector(
    (state: RootState) => state.signedIn.isSignedIn
  );
  const router = useRouter();
  function restErrors() {
    dispatch(changeSignUpUsernameError(false));
    dispatch(changeSignUpPasswordError(false));
    dispatch(changeSignUpEmailError(false));
  }
  async function addUser() {
    const data = {
      username: signUpState.SignUpUsername,
      password: signUpState.SignUpPassword,
      email: signUpState.SignUpEmail,
    };
    if (
      !data.username ||
      data.username.length < 8 ||
      data.username.length > 25
    ) {
      dispatch(changeSignUpUsernameError(true));
      dispatch(
        changeSignUpErrorMessage("Username should be between 8 and 25 letters")
      );
      return;
    } else if (
      !data.password ||
      data.password.length < 8 ||
      data.password.length > 40
    ) {
      dispatch(changeSignUpUsernameError(false));
      dispatch(changeSignUpPasswordError(true));
      dispatch(
        changeSignUpErrorMessage("Password should be between 8 and 40 letters")
      );

      return;
    } else if (!data.email || EmailValidator.validate(data.email) != true) {
      dispatch(changeSignUpUsernameError(false));
      dispatch(changeSignUpPasswordError(false));
      dispatch(changeSignUpEmailError(true));
      dispatch(changeSignUpErrorMessage("Invalid Email"));
      return;
    } else {
      restErrors();
      const result = await fetch("/api/createUser", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        dispatch(changeSignUpEmailError(true));
        dispatch(changeSignUpErrorMessage("Email has been used before"));
      } else if (result.ok) {
        try {
          const newUser = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
          );
        } catch (e) {
          return;
        }

        await sendEmailVerification(auth.currentUser!);
        dispatch(
          changeSignUpErrorMessage(
            "You have Signed up sucessfully please check your email for vertification link"
          )
        );

        setTimeout(() => {
          dispatch(changeSignUpUsername(""));
          dispatch(changeSignUpPassword(""));
          dispatch(changeSignUpEmail(""));
        }, 500);
      }

      return result;
    }
  }
  async function userSignIn(loginEmail: string, loginpassword: string) {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginpassword
      );
      if (!user.user.emailVerified) {
        dispatch(changeSignInEmailError(false));
        dispatch(changeSignInPasswordError(false));
        dispatch(
          changeSignInErrorError("Please verify your email and try again")
        );
      } else {
        dispatch(changeSignInEmailError(false));
        dispatch(changeSignInPasswordError(false));
        dispatch(changeSignInErrorError(""));

        const UserData = await getSignedInUserData(loginEmail);
        let favData = (await getFavsList(loginEmail)) || [];
        dispatch(changeIsSignedIn(true));
        dispatch(changeSignedInUsername(UserData.userdatabase.username));
        dispatch(changeSignedInEmail(UserData.userdatabase.email));
        dispatch(changeSignedInFavs(favData.userdatabase.favs));
        localStorage.setItem("favs", JSON.stringify(favData.userdatabase.favs));
        localStorage.setItem("SignedIn", "true");
        localStorage.setItem("Username", UserData.userdatabase.username);
        localStorage.setItem("Email", UserData.userdatabase.email);
        setTimeout(() => {
          router.push("/");
        }, 100);
      }
    } catch (e) {
      dispatch(changeSignInEmailError(true));
      dispatch(changeSignInPasswordError(true));
      dispatch(
        changeSignInErrorError(
          "Username or Password is incorret please try again"
        )
      );
    }
  }
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
            <SignUp
              addUser={addUser}
              setSignInUpSwitcher={setSignInUpSwitcher}
            />
          ) : (
            ""
          )}
          {!phoneUser || (phoneUser && signInUpSwitcher) ? (
            <SignIn
              userSignIn={userSignIn}
              setSignInUpSwitcher={setSignInUpSwitcher}
            />
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
