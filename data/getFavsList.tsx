import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export async function getFavsList(email: string) {
  const graphQLClient = new GraphQLClient(endpoint);
  console.log(email);

  const query = gql`
    query MyQuery {
      userdatabase(where: { email: "${email}" }) {
        favs {
          slug
          title
          excerpt
          coverImage {
            url
          }
          categories {
            slug
          }
        }
      }
    }
  `;
  try {
    const result = await graphQLClient.request(query);
    return result;
  } catch (e) {
    console.log(e);
  }
}
