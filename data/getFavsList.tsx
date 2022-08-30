import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export async function getFavsList(email: string) {
  const graphQLClient = new GraphQLClient(endpoint);
  console.log(email);

  const query = gql`
<<<<<<< HEAD
   query MyQuery {
  userdatabase(where: {email: "${email}"}) {
    favs {
      slug
      title
      excerpt
      coverImage {
        url
      }
      categories {
        slug
=======
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
>>>>>>> b2477b74fe5bff5203a9c5ae7952e0fc3e8ec9e4
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
