import { useContext, useEffect, useState } from "react";
import context from "../../context/context";
import styles from "./Sign.module.scss";
import { actionTypes, contextType } from "../../utilitis/types";

import * as EmailValidator from "email-validator";
import SignUp from "../../components/sign/SignUp";
import SignIn from "../../components/sign/SignIn";

function Signup() {
  const [SignUpusername, setSignUpusername] = useState<any>();
  const [SignUppassword, setSignUppassword] = useState<any>();
  const [email, setEmail] = useState<any>();
  useEffect(() => {
    dispatch({
      type: actionTypes.CHANGE_ERROR_MESSAGE,
      value: document.querySelector("#error") as HTMLElement,
    });
  }, []);

  const data = useContext(context);
  const { state, dispatch } = data as contextType;
  const { signIn } = state;
  const { errorMessage } = state.signUp;
  const { phoneUser } = state;
  function restErrors() {
    dispatch({
      type: actionTypes.CHNAGE_SIGN_UP_EMAIL_ERROR,
      value: false,
    });
    dispatch({
      type: actionTypes.CHNAGE_SIGN_UP_USERNAME_ERROR,
      value: false,
    });
    dispatch({
      type: actionTypes.CHNAGE_SIGN_UP_PASSWORD_ERROR,
      value: false,
    });
  }
  async function addUser() {
    const data = {
      username: SignUpusername.current?.value,
      password: SignUppassword.current?.value,
      email: email.current?.value,
    };
    if (
      !data.username ||
      data.username.length < 8 ||
      data.username.length > 25
    ) {
      dispatch({
        type: actionTypes.CHNAGE_SIGN_UP_USERNAME_ERROR,
        value: true,
      });
      errorMessage.innerHTML = "Username should be between 8 and 25 letters";
      return;
    } else if (
      !data.password ||
      data.password.length < 8 ||
      data.password.length > 40
    ) {
      dispatch({
        type: actionTypes.CHNAGE_SIGN_UP_PASSWORD_ERROR,
        value: true,
      });
      dispatch({
        type: actionTypes.CHNAGE_SIGN_UP_USERNAME_ERROR,
        value: false,
      });
      errorMessage.innerHTML = "Password should be between 8 and 40 letters";

      return;
    } else if (!data.email || EmailValidator.validate(data.email) != true) {
      dispatch({
        type: actionTypes.CHNAGE_SIGN_UP_EMAIL_ERROR,
        value: true,
      });
      dispatch({
        type: actionTypes.CHNAGE_SIGN_UP_USERNAME_ERROR,
        value: false,
      });
      dispatch({
        type: actionTypes.CHNAGE_SIGN_UP_PASSWORD_ERROR,
        value: false,
      });
      errorMessage.innerHTML = "Invalid Email";
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
      console.log(result);

      if (!result.ok) {
        errorMessage.innerHTML = "Email has been used before ";
        dispatch({
          type: actionTypes.CHNAGE_SIGN_UP_EMAIL_ERROR,
          value: true,
        });
      } else if (result.ok) {
        errorMessage.innerHTML = "You have Signed up sucessfully ";
        setTimeout(() => {
          dispatch({ type: actionTypes.CHANGE_SIGN_IN, value: true });
          if (
            SignUpusername.current &&
            SignUppassword.current &&
            email.current
          ) {
            SignUpusername.current.value = "";
            SignUppassword.current.value = "";
            email.current.value = "";
          }
        }, 1000);
      }

      return result;
    }
  }
  return (
    <div className={`${styles.Sign}`}>
      <div
        className={`${styles.Sign__content} ${
          !signIn ? styles.Sign__content_up : ""
        }`}
      >
        {!phoneUser || (phoneUser && !signIn) ? (
          <SignUp
            addUser={addUser}
            setEmail={setEmail}
            setSignUpusername={setSignUpusername}
            setSignUppassword={setSignUppassword}
          />
        ) : (
          ""
        )}
        {!phoneUser || (phoneUser && signIn) ? <SignIn /> : ""}
      </div>
    </div>
  );
}

export default Signup;
