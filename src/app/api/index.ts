"use server";

import { octokit } from "@/lib/octokit";

export async function getContributions(username: string) {
    const query = `
      query ($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }`;

    const variables = { login: username };

    const response = await octokit.graphql(query, variables);
    const data = await response.user.contributionsCollection.contributionCalendar;
    return data;
}
