import { useRef } from "react";
import styles from "../../pages/sign/Sign.module.scss";
import { useDispatch, useSelector } from "react-redux";
import * as EmailValidator from "email-validator";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../utilitis/firebase-config";
interface props {
  setSignInUpSwitcher: Function;
}
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

function SignUp(props: props) {
  const { setSignInUpSwitcher } = props;
  const SignUpusername = useRef<HTMLInputElement>(null);
  const SignUppassword = useRef<HTMLInputElement>(null);
  const SignUpemail = useRef<HTMLInputElement>(null);
  const signUpState = useSelector(signUpData);
  const dispatch = useDispatch();

  function restErrors() {
    dispatch(changeSignUpUsernameError(false));
    dispatch(changeSignUpPasswordError(false));
    dispatch(changeSignUpEmailError(false));
  }
  async function addUser() {
    const data = {
      username: SignUpusername.current?.value,
      password: SignUppassword.current?.value,
      email: SignUpemail.current?.value,
    };
    if (
      !data.username ||
      data.username.length < 8 ||
      data.username.length > 18
    ) {
      dispatch(changeSignUpUsernameError(true));
      dispatch(
        changeSignUpErrorMessage("Username should be between 8 and 18 letters")
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
          />
        </div>
        <div>
          <input
            type="password"
            ref={SignUppassword}
            placeholder="Password"
            className={signUpState.SignUpPasswordError ? styles.error : ""}
          />
        </div>
        <div>
          <input
            type="text"
            ref={SignUpemail}
            placeholder="E-mail"
            className={signUpState.SignUpEmailError ? styles.error : ""}
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
