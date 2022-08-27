import { gql, request } from "graphql-request";

const graphqlAPI = process.env.GRAPHQL_API_KEY as string;

export async function getCategoriesData() {
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
  const result = await request(graphqlAPI, query);
  return result;
}
