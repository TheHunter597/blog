import styles from "../../pages/sign/Sign.module.scss";
import { useRef, useContext, useEffect } from "react";
import context from "../../context/context";
import { actionTypes, contextType } from "../../utilitis/types";

interface props {
  userSignIn: Function;
  setSignInUpSwitcher: Function;
}

function SignIn(props: props) {
  const { userSignIn, setSignInUpSwitcher } = props;
  const data = useContext(context);
  const { state, dispatch } = data as contextType;
  const {
    signIn: { SignInPasswordError, SignInEmailError },
  } = state;
  const loginEmail = useRef<HTMLInputElement>(null);
  const loginPassword = useRef<HTMLInputElement>(null);
  useEffect(() => {
    dispatch({
      type: actionTypes.CHANGE_SIGN_IN_ERROR_MESSAGE,
      value: document.querySelector("#signInError") as HTMLElement,
    });
  }, []);
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
              className={SignInEmailError ? styles.error : ""}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              ref={loginPassword}
              className={SignInPasswordError ? styles.error : ""}
            />
          </div>
        </div>
        <div className={styles.Sign__confirm}>
          <h4>
            Or <span onClick={() => setSignInUpSwitcher(false)}>sign up</span>
          </h4>
          <small className={styles.Sign__error} id="signInError"></small>
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
