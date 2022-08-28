import { useRef, useContext, useEffect } from "react";
import context from "../../context/context";
import { actionTypes, contextType } from "../../utilitis/types";
import styles from "../../pages/sign/Sign.module.scss";
interface props {
  addUser: () => void;
  setSignUpusername: Function;
  setSignUppassword: Function;
  setEmail: Function;
}

function SignUp(props: props) {
  const { addUser, setSignUpusername, setSignUppassword, setEmail } = props;
  const data = useContext(context);
  const { state, dispatch } = data as contextType;
  const { SignUpUsernameError, SignUpPasswordError, emailError } = state.signUp;
  const SignUpusername = useRef<HTMLInputElement>(null);
  const SignUppassword = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setSignUpusername(SignUpusername);
    setSignUppassword(SignUppassword);
    setEmail(email);
  }, [
    SignUpusername.current?.value,
    SignUppassword.current?.value,
    email.current?.value,
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
            ref={email}
            placeholder="E-mail"
            className={emailError ? styles.error : ""}
          />
        </div>
        <div className={styles.Sign__confirm}>
          <h4>
            Or{" "}
            <span
              onClick={() =>
                dispatch({
                  type: actionTypes.CHANGE_SIGN_IN,
                  value: true,
                })
              }
            >
              sign in
            </span>
          </h4>
          <small id="error" className={styles.Sign__error}></small>
          <button>Confirm</button>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
