import { createContext, useReducer } from "react";
import { actionTypes, state, contextType } from "../utilitis/types";
import { getPostsData } from "../data/getPostsData";
import { getCategoriesData } from "../data/getCategoriesData";
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
  signIn: false,
  signUp: {
    SignUpUsernameError: false,
    SignUpPasswordError: false,
    emailError: false,
    errorMessage: "",
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
    case actionTypes.CHANGE_SIGN_IN:
      return { ...state, signIn: value };
    case actionTypes.CHNAGE_SIGN_UP_USERNAME_ERROR:
      return {
        ...state,
        signUp: { ...state.signUp, SignUpUsernameError: value },
      };
    case actionTypes.CHNAGE_SIGN_UP_PASSWORD_ERROR:
      return {
        ...state,
        signUp: { ...state.signUp, SignUpPasswordError: value },
      };
    case actionTypes.CHNAGE_SIGN_UP_EMAIL_ERROR:
      return { ...state, signUp: { ...state.signUp, emailError: value } };
    case actionTypes.CHANGE_ERROR_MESSAGE:
      return { ...state, signUp: { ...state.signUp, errorMessage: value } };
    default:
      return state;
  }
}

export function ContextProvider(props: props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getCatPosts() {
    let allPosts = (await getPostsData()) || [];
    let categoriesData = (await getCategoriesData()) || [];
    dispatch({ type: actionTypes.CHANGE_POSTS, value: await allPosts.posts });
    dispatch({
      type: actionTypes.CHANGE_CATEGORIES_DATA,
      value: categoriesData,
    });
  }

  return (
    <context.Provider value={{ state, dispatch, getCatPosts }}>
      {props.children}
    </context.Provider>
  );
}

export default context;
