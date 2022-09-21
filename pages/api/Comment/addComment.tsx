import type { NextApiRequest, NextApiResponse } from "next";

import { gql } from "graphql-request";

import { GraphQLClient } from "graphql-request";

const endpoint = process.env.GRAPHQL_API_KEY as string;

async function addNewComment(req: NextApiRequest, res: NextApiResponse) {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHQL_ADMIN}`,
    },
  });
  const mutation = gql`
    mutation MyMutation($email: String!, $slug: String!, $comment: String!) {
      createComment(
        data: {
          userdatabase: { connect: { email: $email } }
          post: { connect: { slug: $slug } }
          comment: $comment
        }
      ) {
        id
        comment
      }
    }
  `;
  try {
    const result = await graphQLClient.request(mutation, req.body);
    return res
      .status(200)
      .json({ message: "Comment created Sucessfully", body: result });
  } catch (e) {
    res.json({ e });
    console.log(e);
  }
}

export default addNewComment;
