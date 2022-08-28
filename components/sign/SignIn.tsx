import styles from "../../pages/sign/Sign.module.scss";
import { useRef, useContext, useEffect } from "react";
import context from "../../context/context";
import { actionTypes, contextType } from "../../utilitis/types";

function SignIn() {
  const data = useContext(context);
  const { state, dispatch } = data as contextType;
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={styles.Sign__Signin}>
        <h2>Sign in</h2>
        <div>
          <div>
            <input type="text" placeholder="Username" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <div className={styles.Sign__confirm}>
          <h4>
            Or{" "}
            <span
              onClick={() =>
                dispatch({
                  type: actionTypes.CHANGE_SIGN_IN,
                  value: false,
                })
              }
            >
              sign up
            </span>
          </h4>
          <button>Confirm</button>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
