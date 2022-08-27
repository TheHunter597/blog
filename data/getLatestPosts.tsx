import { gql, request } from "graphql-request";

const graphqlAPI = process.env.GRAPHQL_API_KEY as string;

export async function getLatestPosts() {
  const query = gql`
    query getLatestPosts {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        coverImage {
          url
        }
        excerpt
        slug
        id
        categories {
          slug
          name
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result;
}
