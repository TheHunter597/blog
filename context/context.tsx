import { createContext, useEffect, useReducer } from "react";
import { actionTypes, state, contextType } from "../utilitis/types";
import { getPostsData } from "../data/getPostsData";
import { getCategoriesData } from "../data/getCategoriesData";
import { useRouter } from "next/router";
interface props {
  children: JSX.Element;
}

interface action {
  type: actionTypes;
  value: any;
}

const context = createContext<contextType | null>(null);

const initialState: state = {
  posts: [],
  categories: { categories: [] },
  phoneUser: false,
  signIn: {
    SignInPasswordError: false,
    SignInEmailError: false,
    SignInErrorMessage: "",
    SignInUserEmail: "",
  },
  signUp: {
    SignUpUsernameError: false,
    SignUpPasswordError: false,
    emailError: false,
    SignUpErrorMessage: "",
  },
  signedIn: {
    isSignedIn: false,
    username: "",
    email: "",
    favs: [],
  },
};

function reducer(state: state, action: action): state {
  const { value } = action;

  switch (action.type) {
    case actionTypes.CHANGE_POSTS:
      return { ...state, posts: value };
    case actionTypes.CHANGE_CATEGORIES_DATA:
      return { ...state, categories: value };
    case actionTypes.CHANGE_PHONE_USER:
      return { ...state, phoneUser: value };
    case actionTypes.CHANGE_SIGN_UP_USERNAME_ERROR:
      return {
        ...state,
        signUp: { ...state.signUp, SignUpUsernameError: value },
      };
    case actionTypes.CHANGE_SIGN_UP_PASSWORD_ERROR:
      return {
        ...state,
        signUp: { ...state.signUp, SignUpPasswordError: value },
      };
    case actionTypes.CHANGE_SIGN_UP_EMAIL_ERROR:
      return { ...state, signUp: { ...state.signUp, emailError: value } };
    case actionTypes.CHANGE_SIGN_UP_ERROR_MESSAGE:
      return {
        ...state,
        signUp: { ...state.signUp, SignUpErrorMessage: value },
      };
    case actionTypes.CHANGE_SIGN_IN_PASSWORD_ERROR:
      return {
        ...state,
        signIn: { ...state.signIn, SignInPasswordError: value },
      };
    case actionTypes.CHANGE_SIGN_IN_EMAIL_ERROR:
      return { ...state, signIn: { ...state.signIn, SignInEmailError: value } };
    case actionTypes.CHANGE_SIGN_IN_ERROR_MESSAGE:
      return {
        ...state,
        signIn: { ...state.signIn, SignInErrorMessage: value },
      };
    case actionTypes.CHANGE_SIGNED_IN:
      return { ...state, signedIn: { ...state.signedIn, isSignedIn: value } };
    case actionTypes.CHANGE_SIGNED_IN_USERNAME:
      return { ...state, signedIn: { ...state.signedIn, username: value } };
    case actionTypes.CHANGE_SIGNED_IN_EMAIL:
      return { ...state, signedIn: { ...state.signedIn, email: value } };
    case actionTypes.ADD_FAVS_LIST:
      return {
        ...state,
        signedIn: { ...state.signedIn, favs: [...state.signedIn.favs, value] },
      };
    case actionTypes.REMOVE_FAVS_LIST:
      return { ...state, signedIn: { ...state.signedIn, favs: value } };
    case actionTypes.SET_USER_FAVS_LIST:
      return { ...state, signedIn: { ...state.signedIn, favs: value } };
    default:
      return state;
  }
}

export function ContextProvider(props: props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("SignedIn") == "true") {
      dispatch({ type: actionTypes.CHANGE_SIGNED_IN, value: true });
      dispatch({
        type: actionTypes.CHANGE_SIGNED_IN_USERNAME,
        value: localStorage.getItem("Username"),
      });
      dispatch({
        type: actionTypes.CHANGE_SIGNED_IN_EMAIL,
        value: localStorage.getItem("Email"),
      });
      dispatch({
        type: actionTypes.SET_USER_FAVS_LIST,
        value: localStorage.getItem("favs"),
      });
      // dispatch({
      //   type: actionTypes.SET_USER_FAVS_LIST,
      //   value:
      //     localStorage.getItem("favs") === null
      //       ? []
      //       : localStorage.getItem("favs"),
      // });
    }
  }, [state.signedIn.isSignedIn]);
  console.log(state);

  async function getCatPosts() {
    let allPosts = (await getPostsData()) || [];
    let categoriesData = (await getCategoriesData()) || [];
    dispatch({ type: actionTypes.CHANGE_POSTS, value: await allPosts.posts });
    dispatch({
      type: actionTypes.CHANGE_CATEGORIES_DATA,
      value: categoriesData,
    });
  }

  function signOut() {
    localStorage.removeItem("SignedIn");
    localStorage.removeItem("Username");
    localStorage.removeItem("Email");
    localStorage.removeItem("favs");

    setTimeout(() => {
      location.reload();
      router.push("/");
    }, 500);
  }
  return (
    <context.Provider value={{ state, dispatch, getCatPosts, signOut }}>
      {props.children}
    </context.Provider>
  );
}

export default context;
