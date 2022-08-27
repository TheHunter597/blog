import { gql, request } from "graphql-request";

const graphqlAPI = process.env.GRAPHQL_API_KEY as string;

export async function getCategoryData(category: string) {
  const query = gql`
    query MyQuery {
      category(where: { slug: "${category}" }) {
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
  const result = await request(graphqlAPI, query);
  return result;
}
