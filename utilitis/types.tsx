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

// export enum actionType {
//   CHANGE_POSTS_DATA = "CHANGE_POSTS_DATA",
// }

// export type dispatch = ({
//   type,
//   value,
// }: {
//   type: actionType;
//   value: any;
// }) => void;
