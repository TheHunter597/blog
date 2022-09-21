import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export async function getSignedInUserData(email: string) {
  const graphQLClient = new GraphQLClient(endpoint);

  const query = gql`
    query MyQuery {
  userdatabase(where: {email: "${email}"}) {
    email
    username
    favs {
      excerpt
      slug
      title
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
    console.log(email);
    console.log(result);

    return result;
  } catch (e) {
    console.log(e);
    console.log(email);
  }
}
