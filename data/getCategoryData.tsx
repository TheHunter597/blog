import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export async function getCategoryData(category: string) {
  const graphQLClient = new GraphQLClient(endpoint);
  const query = gql`
    query MyQuery {
      category(where: { slug: "${category}" }) {
        name
        slug
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
    }
  `;
  const result = await graphQLClient.request(query);
  return result;
}
