import { gql, GraphQLClient } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

const endpoint = process.env.GRAPHQL_API_KEY as string;

export default async function deleteComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHQL_ADMIN}`,
    },
  });
  const mutation = gql`
    mutation MyMutation($id: ID!) {
      deleteComment(where: { id: $id }) {
        id
      }
    }
  `;
  try {
    graphQLClient.request(mutation, req.body);
    res.json({ message: "comment deleted sucessfully" });
  } catch (e) {
    res.json({ message: e });
  }
}
