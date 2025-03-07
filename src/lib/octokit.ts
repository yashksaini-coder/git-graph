const { Octokit } = require("octokit");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN is not set");
}

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, 
});
