import { Octokit } from "octokit";
import { graphql } from "@octokit/graphql";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN is not set");
}

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Initialize the GraphQL client with authentication
export const octokitGraphQL = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});