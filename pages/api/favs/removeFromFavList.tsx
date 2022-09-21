import type { NextApiRequest, NextApiResponse } from "next";

import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";

const endpoint = process.env.GRAPHQL_API_KEY as string;

export default async function removeFromFavList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHQL_ADMIN}`,
    },
  });

  const query = gql`
    mutation MyMutation($email: String!, $slug: String!) {
      updateUserdatabase(
        where: { email: $email }
        data: { favs: { disconnect: { slug: $slug } } }
      ) {
        id
      }
      publishUserdatabase(where: { email: $email }) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);
    res.status(200).json({ message: "Favs updated successfully" });
    return result;
  } catch (e) {
    res.status(400).json({ message: "Error" });
    console.log(e);
    return e;
  }
}
