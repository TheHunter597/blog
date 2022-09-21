import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export async function getPostComments(slug: string) {
  const graphQLClient = new GraphQLClient(endpoint);
  const query = gql`
    query MyQuery {
      post(where: { slug:"${slug}" }) {
        comments(orderBy: publishedAt_DESC) {
          comment
          publishedAt
          id
          userdatabase {
        email
      }
        }
      }
    }
  `;
  const result = await graphQLClient.request(query);
  return result;
}
