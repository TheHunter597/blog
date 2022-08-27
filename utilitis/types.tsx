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
