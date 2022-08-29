import { useRef, useContext, useEffect } from "react";
import context from "../../context/context";
import { actionTypes, contextType } from "../../utilitis/types";
import styles from "../../pages/sign/Sign.module.scss";
interface props {
  addUser: () => void;
  setSignUpusername: Function;
  setSignUppassword: Function;
  setEmail: Function;
  setSignInUpSwitcher: Function;
}

function SignUp(props: props) {
  const {
    addUser,
    setSignUpusername,
    setSignUppassword,
    setEmail,
    setSignInUpSwitcher,
  } = props;
  const data = useContext(context);
  const { state, dispatch } = data as contextType;
  const { SignUpUsernameError, SignUpPasswordError, emailError } = state.signUp;
  let SignUpusername = useRef<HTMLInputElement>(null);
  const SignUppassword = useRef<HTMLInputElement>(null);
  const SignUpemail = useRef<HTMLInputElement>(null);
  useEffect(() => {
    dispatch({
      type: actionTypes.CHANGE_SIGN_UP_ERROR_MESSAGE,
      value: document.querySelector("#signUpError") as HTMLElement,
    });
  }, []);
  useEffect(() => {
    setSignUpusername(SignUpusername.current);
    setSignUppassword(SignUppassword.current);
    setEmail(SignUpemail);
  }, [
    SignUpusername.current?.value,
    SignUppassword.current?.value,
    SignUpemail.current?.value,
  ]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addUser();
      }}
    >
      <div>
        <h2>Sign up</h2>
        <div>
          <input
            type="text"
            ref={SignUpusername}
            placeholder="Username"
            className={SignUpUsernameError ? styles.error : ""}
          />
        </div>
        <div>
          <input
            type="password"
            ref={SignUppassword}
            placeholder="Password"
            className={SignUpPasswordError ? styles.error : ""}
          />
        </div>
        <div>
          <input
            type="text"
            ref={SignUpemail}
            placeholder="E-mail"
            className={emailError ? styles.error : ""}
          />
        </div>
        <div className={styles.Sign__confirm}>
          <h4>
            Or <span onClick={() => setSignInUpSwitcher(true)}>sign in</span>
          </h4>
          <small id="signUpError" className={styles.Sign__error}></small>
          <button>Confirm</button>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
