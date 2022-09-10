import { useRef } from "react";
import styles from "../../pages/sign/Sign.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { signUpData } from "../../redux/signUp";
import {
  changeSignUpUsername,
  changeSignUpPassword,
  changeSignUpEmail,
} from "../../redux/signUp";
interface props {
  addUser: () => void;
  setSignInUpSwitcher: Function;
}

function SignUp(props: props) {
  const { addUser, setSignInUpSwitcher } = props;
  let SignUpusername = useRef<HTMLInputElement>(null);
  const SignUppassword = useRef<HTMLInputElement>(null);
  const SignUpemail = useRef<HTMLInputElement>(null);
  const signUpState = useSelector(signUpData);
  const dispatch = useDispatch();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTimeout(() => {
          addUser();
        }, 100);
      }}
    >
      <div>
        <h2>Sign up</h2>
        <div>
          <input
            type="text"
            ref={SignUpusername}
            placeholder="Username"
            className={signUpState.SignUpUsernameError ? styles.error : ""}
            onChange={() =>
              dispatch(changeSignUpUsername(SignUpusername.current?.value))
            }
            value={signUpState.SignUpUsername}
          />
        </div>
        <div>
          <input
            type="password"
            ref={SignUppassword}
            placeholder="Password"
            className={signUpState.SignUpPasswordError ? styles.error : ""}
            onChange={() =>
              dispatch(changeSignUpPassword(SignUppassword.current?.value))
            }
            value={signUpState.SignUpPassword}
          />
        </div>
        <div>
          <input
            type="text"
            ref={SignUpemail}
            placeholder="E-mail"
            className={signUpState.SignUpEmailError ? styles.error : ""}
            value={signUpState.SignUpEmail}
            onChange={() =>
              dispatch(changeSignUpEmail(SignUpemail.current?.value))
            }
          />
        </div>
        <div className={styles.Sign__confirm}>
          <h4>
            Already have an account{" "}
            <span onClick={() => setSignInUpSwitcher(true)}>sign in</span>
          </h4>
          <small className={styles.Sign__error}>
            {signUpState.SignUpErrorMessage}
          </small>
          <button>Confirm</button>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
