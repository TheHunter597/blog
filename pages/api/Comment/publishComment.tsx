import type { NextApiRequest, NextApiResponse } from "next";

import { gql } from "graphql-request";

import { GraphQLClient } from "graphql-request";

const endpoint = process.env.GRAPHQL_API_KEY as string;
async function publishComment(req: NextApiRequest, res: NextApiResponse) {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHQL_ADMIN}`,
    },
  });
  const mutation = gql`
    mutation MyMutation($id: ID!) {
      publishComment(where: { id: $id }) {
        id
      }
    }
  `;
  try {
    const result = await graphQLClient.request(mutation, req.body);
    res.status(200).json(result);
  } catch (e) {
    res.json({ e });
  }
}

export default publishComment;
