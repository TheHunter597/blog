import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
const endpoint =
  "https://api-us-east-1.hygraph.com/v2/cl78bu1o60r3p01um8er1bb3c/master";

export async function getCategoriesData() {
  const graphQLClient = new GraphQLClient(endpoint);
  const query = gql`
    query MyQuery {
      categories {
        slug
        name
        posts {
          slug
          title
          coverImage {
            url
          }
          excerpt
          categories {
            slug
            name
          }
        }
      }
    }
  `;
  const result = await graphQLClient.request(query);
  return result;
}
