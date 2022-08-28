// import { gql, request } from "graphql-request";

// const graphqlAPI = process.env.GRAPHQL_API_KEY as string;

import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
const endpoint =
  "https://api-us-east-1.hygraph.com/v2/cl78bu1o60r3p01um8er1bb3c/master";

export async function getPostsData() {
  const graphQLClient = new GraphQLClient(endpoint);
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
  const result = await graphQLClient.request(query);
  return result;
}
