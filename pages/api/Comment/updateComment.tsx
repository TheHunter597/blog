import type { NextApiRequest, NextApiResponse } from "next";

import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";

const endpoint = process.env.GRAPHQL_API_KEY as string;

export default async function updateComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHQL_ADMIN}`,
    },
  });

  const mutation = gql`
    mutation MyMutation($comment: String!, $id: ID!) {
      updateComment(data: { comment: $comment }, where: { id: $id }) {
        id
      }
      publishComment(where: { id: $id }) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(mutation, req.body);
    res.status(200).json({ message: "comment updated sucessfully" });
    return result;
  } catch (e) {
    res.status(400).json({ message: "Cant update comment" });
    console.log(e);
    return e;
  }
}
