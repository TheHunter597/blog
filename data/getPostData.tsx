import { gql, request } from "graphql-request";

const graphqlAPI = process.env.GRAPHQL_API_KEY as string;

export async function getPostData(slug: string) {
  const query = gql`
  query MyQuery {
    post(where: {slug: "${slug}"}) {
      createdAt
      date
      excerpt
      slug
      title
      content {
        html
      }
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }
  }
  `;
  const result = await request(graphqlAPI, query);
  return result;
}
