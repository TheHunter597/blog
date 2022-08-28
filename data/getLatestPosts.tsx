// import { gql, request } from "graphql-request";

// const graphqlAPI = process.env.GRAPHQL_API_KEY as string;

import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
const endpoint =
  "https://api-us-east-1.hygraph.com/v2/cl78bu1o60r3p01um8er1bb3c/master";

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
