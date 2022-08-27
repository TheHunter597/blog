import { gql, request } from "graphql-request";

const graphqlAPI = process.env.GRAPHQL_API_KEY as string;

export async function getPostsData() {
  const query = gql`
    query MyQuery {
      posts {
        title
        slug
        excerpt
        coverImage {
          url
        }
        categories {
          name
          slug
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result;
}
