import styles from "../../pages/sign/Sign.module.scss";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInData } from "../../redux/signIn";
import {
  changeSignInPasswordError,
  changeSignInEmailError,
  changeSignInErrorError,
} from "../../redux/signIn";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getSignedInUserData } from "../../data/getSignedInUserData";
import { RootDispatch, RootState } from "../../redux";
import { useRouter } from "next/router";
import { auth } from "../../utilitis/firebase-config";
import {
  changeSignedInUsername,
  changeSignedInEmail,
  changeIsSignedIn,
  changeSignedInFavs,
} from "../../redux/signedIn";

interface props {
  setSignInUpSwitcher: Function;
}
function SignIn(props: props) {
  const { setSignInUpSwitcher } = props;
  const [test, setTest] = useState([]);
  console.log(test);

  const loginEmail = useRef<HTMLInputElement>(null);
  const loginPassword = useRef<HTMLInputElement>(null);
  const signInState = useSelector(signInData);
  const dispatch: RootDispatch = useDispatch();
  const router = useRouter();
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
        setTest(UserData);
        dispatch(changeIsSignedIn(true));
        dispatch(changeSignedInUsername(UserData.userdatabase.username));
        dispatch(changeSignedInEmail(UserData.userdatabase.email));
        dispatch(changeSignedInFavs(UserData.userdatabase.favs));
        localStorage.setItem(
          "favs",
          JSON.stringify(UserData.userdatabase.favs)
        );
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
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={styles.Sign__Signin}>
        <h2>Sign in</h2>
        <div>
          <div>
            <input
              type="email"
              placeholder="E-mail"
              ref={loginEmail}
              className={signInState.SignInEmailError ? styles.error : ""}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              ref={loginPassword}
              className={signInState.SignInPasswordError ? styles.error : ""}
            />
          </div>
        </div>
        <div className={styles.Sign__confirm}>
          <h4>
            Dont have an account, Create one now{" "}
            <span onClick={() => setSignInUpSwitcher(false)}>sign up</span>
          </h4>
          <small className={styles.Sign__error}>
            {signInState.SignInErrorMessage}
          </small>
          <button
            onClick={() =>
              userSignIn(
                loginEmail.current ? loginEmail.current.value : "",
                loginPassword.current ? loginPassword.current.value : ""
              )
            }
          >
            Confirm
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
