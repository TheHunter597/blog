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
}

export interface state {
  posts: { title: string; slug: string; categories: { slug: string }[] }[];
  categories: {
    categories: { name: string; slug: string; posts: { excerpt: string }[] }[];
  };
  phoneUser: boolean;
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
}
