import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

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
