import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export async function getLatestPosts() {
  const graphQLClient = new GraphQLClient(endpoint);
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
  const result = await graphQLClient.request(query);
  return result;
}
