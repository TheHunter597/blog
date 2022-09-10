import styles from "../../pages/sign/Sign.module.scss";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { signInData } from "../../redux/signIn";

interface props {
  userSignIn: Function;
  setSignInUpSwitcher: Function;
}

function SignIn(props: props) {
  const { userSignIn, setSignInUpSwitcher } = props;
  const loginEmail = useRef<HTMLInputElement>(null);
  const loginPassword = useRef<HTMLInputElement>(null);
  const signInState = useSelector(signInData);
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
                loginEmail.current?.value,
                loginPassword.current?.value
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
