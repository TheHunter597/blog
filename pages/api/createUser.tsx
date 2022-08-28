import type { NextApiRequest, NextApiResponse } from "next";

import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";

const endpoint = process.env.GRAPHQL_API_KEY as string;

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHQL_ADMIN}`,
    },
  });

  const query = gql`
    mutation AddMovie($username: String!, $password: String!, $email: String!) {
      createUserdatabase(
        data: { username: $username, password: $password, email: $email }
      ) {
        username
        password
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);
    res.status(200).json({ message: "User created sucessfully" });
    return result;
  } catch (e) {
    console.log(e);

    res.status(400).json(e);
    return e;
  }
}
