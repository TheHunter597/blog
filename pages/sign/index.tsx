import { useContext, useEffect, useState } from "react";
import context from "../../context/context";
import styles from "./Sign.module.scss";
import { actionTypes, contextType } from "../../utilitis/types";
import { auth } from "../../utilitis/firebase-config";
import * as EmailValidator from "email-validator";
import SignUp from "../../components/sign/SignUp";
import SignIn from "../../components/sign/SignIn";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
import { getSignedInUserData } from "../../data/getSignedInUserData";

function Sign() {
  const [SignUpusername, setSignUpusername] = useState<any>();
  const [SignUppassword, setSignUppassword] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [signInUpSwitcher, setSignInUpSwitcher] = useState(false);
  const data = useContext(context);
  const { state, dispatch } = data as contextType;
  const { SignInErrorMessage } = state.signIn;
  const { SignUpErrorMessage } = state.signUp;
  const { phoneUser } = state;
  const router = useRouter();
  function restErrors() {
    dispatch({
      type: actionTypes.CHANGE_SIGN_UP_EMAIL_ERROR,
      value: false,
    });
    dispatch({
      type: actionTypes.CHANGE_SIGN_UP_USERNAME_ERROR,
      value: false,
    });
    dispatch({
      type: actionTypes.CHANGE_SIGN_UP_PASSWORD_ERROR,
      value: false,
    });
  }
  async function addUser() {
    const data = {
      username: SignUpusername.value,
      password: SignUppassword.value,
      email: email.current.value,
    };
    if (
      !data.username ||
      data.username.length < 8 ||
      data.username.length > 25
    ) {
      dispatch({
        type: actionTypes.CHANGE_SIGN_UP_USERNAME_ERROR,
        value: true,
      });
      SignUpErrorMessage.innerHTML =
        "Username should be between 8 and 25 letters";
      return;
    } else if (
      !data.password ||
      data.password.length < 8 ||
      data.password.length > 40
    ) {
      dispatch({
        type: actionTypes.CHANGE_SIGN_UP_PASSWORD_ERROR,
        value: true,
      });
      dispatch({
        type: actionTypes.CHANGE_SIGN_UP_USERNAME_ERROR,
        value: false,
      });
      SignUpErrorMessage.innerHTML =
        "Password should be between 8 and 40 letters";

      return;
    } else if (!data.email || EmailValidator.validate(data.email) != true) {
      dispatch({
        type: actionTypes.CHANGE_SIGN_UP_EMAIL_ERROR,
        value: true,
      });
      dispatch({
        type: actionTypes.CHANGE_SIGN_UP_USERNAME_ERROR,
        value: false,
      });
      dispatch({
        type: actionTypes.CHANGE_SIGN_UP_PASSWORD_ERROR,
        value: false,
      });
      SignUpErrorMessage.innerHTML = "Invalid Email";
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
        SignUpErrorMessage.innerHTML = "Email has been used before ";
        dispatch({
          type: actionTypes.CHANGE_SIGN_UP_EMAIL_ERROR,
          value: true,
        });
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
        SignUpErrorMessage.innerHTML =
          "You have Signed up sucessfully please check your email for vertification link";
        setTimeout(() => {
          if (SignUpusername && SignUppassword && email.current) {
            SignUpusername.value = "";
            SignUppassword.value = "";
            email.current.value = "";
          }
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
        dispatch({
          type: actionTypes.CHANGE_SIGN_IN_EMAIL_ERROR,
          value: false,
        });
        dispatch({
          type: actionTypes.CHANGE_SIGN_IN_PASSWORD_ERROR,
          value: false,
        });
        SignInErrorMessage.innerHTML = "Please verify your email and try again";
      } else {
        dispatch({
          type: actionTypes.CHANGE_SIGN_IN_EMAIL_ERROR,
          value: false,
        });
        dispatch({
          type: actionTypes.CHANGE_SIGN_IN_PASSWORD_ERROR,
          value: false,
        });
        SignInErrorMessage.innerHTML = "";

        // const UserData = await getSignedInUserData(loginEmail);

        onAuthStateChanged(auth, async () => {
          const UserData = await getSignedInUserData(loginEmail);
          dispatch({
            type: actionTypes.CHANGE_SIGNED_IN_USERNAME,
            value: UserData.userdatabase.username,
          });
          dispatch({
            type: actionTypes.CHANGE_SIGNED_IN_EMAIL,
            value: UserData.userdatabase.email,
          });
          dispatch({ type: actionTypes.CHANGE_SIGNED_IN, value: true });
        });

        // dispatch({
        //   type: actionTypes.CHANGE_SIGNED_IN_USERNAME,
        //   value: UserData.userdatabase.username,
        // });
        // dispatch({
        //   type: actionTypes.CHANGE_SIGNED_IN_EMAIL,
        //   value: UserData.userdatabase.email,
        // });
        setTimeout(() => {
          router.push("/");
        }, 100);
      }
    } catch (e) {
      dispatch({
        type: actionTypes.CHANGE_SIGN_IN_EMAIL_ERROR,
        value: true,
      });
      dispatch({
        type: actionTypes.CHANGE_SIGN_IN_PASSWORD_ERROR,
        value: true,
      });
      SignInErrorMessage.innerHTML =
        "Username or Password is incorret please try again";
    }
  }
  return (
    <div className={`${styles.Sign}`}>
      <div
        className={`${styles.Sign__content} ${
          !signInUpSwitcher ? styles.Sign__content_up : ""
        }`}
      >
        {!phoneUser || (phoneUser && !signInUpSwitcher) ? (
          <SignUp
            addUser={addUser}
            setEmail={setEmail}
            setSignUpusername={setSignUpusername}
            setSignUppassword={setSignUppassword}
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
    </div>
  );
}

export default Sign;
