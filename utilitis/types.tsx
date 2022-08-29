export interface postsDataType {
  title: string;
  image: string;
  id: string;
  description: string;
}

export type headerPosts = {
  title: string;
  coverImage?: { url: string };
  excerpt: string;
  slug: string;
  categories: [{ slug: string }];
};

export enum actionTypes {
  CHANGE_POSTS = "CHANGE_POSTS",
  CHANGE_CATEGORIES_DATA = "CHANGE_CATEGORIES_DATA",
  CHANGE_PHONE_USER = "CHANGE_PHONE_USER",
  CHANGE_SIGN_UP_USERNAME_ERROR = "CHANGE_SIGN_UP_USERNAME_ERROR",
  CHANGE_SIGN_UP_PASSWORD_ERROR = "CHANGE_SIGN_UP_PASSWORD_ERROR",
  CHANGE_SIGN_UP_EMAIL_ERROR = "CHANGE_SIGN_UP_EMAIL_ERROR",
  CHANGE_SIGN_UP_ERROR_MESSAGE = "CHANGE_SIGN_UP_ERROR_MESSAGE",
  CHANGE_SIGN_IN_EMAIL_ERROR = "CHANGE_SIGN_IN_USERNAME_ERROR",
  CHANGE_SIGN_IN_PASSWORD_ERROR = "CHANGE_SIGN_IN_PASSWORD_ERROR",
  CHANGE_SIGN_IN_ERROR_MESSAGE = "CHANGE_SIGN_IN_ERROR_MESSAGE",
  CHANGE_SIGNED_IN = "CHANGE_SIGN_IN",
  CHANGE_SIGNED_IN_USERNAME = "CHANE_SIGNED_IN_USERNAME",
  CHANGE_SIGNED_IN_EMAIL = "CHANGE_SIGNED_IN_EMAIL",
}

export interface state {
  posts: { title: string; slug: string; categories: { slug: string }[] }[];
  categories: {
    categories: { name: string; slug: string; posts: { excerpt: string }[] }[];
  };
  phoneUser: boolean;
  signIn: {
    SignInErrorMessage: any;
    SignInPasswordError: boolean;
    SignInEmailError: boolean;
    SignInUserEmail: string;
  };
  signUp: {
    SignUpUsernameError: boolean;
    SignUpPasswordError: boolean;
    emailError: boolean;
    SignUpErrorMessage: any;
  };
  signedIn: {
    isSignedIn: boolean;
    username: string;
    email: string;
  };
}

export type dispatch = ({
  type,
  value,
}: {
  type: actionTypes;
  value: any;
}) => void;

export interface contextType {
  state: state;
  dispatch: dispatch;
  getCatPosts: Function;
}
