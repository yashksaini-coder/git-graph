"use server";

"use server";

import { ContributionCalendar } from "@/utils/types";
import { octokitGraphQL } from "@/lib/octokit";

// Function to fetch user contributions
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

  try {
    const response = await octokitGraphQL<{ user: { contributionsCollection: { contributionCalendar: ContributionCalendar } } }>(query, variables);
    const data = response.user.contributionsCollection.contributionCalendar;
    return data;
  } catch (error) {
    console.error(`Error fetching contributions for ${username}:`, error);
  }
}

export async function checkUsernameExists(username: string) {
  const query = `
    query ($login: String!) {
      user(login: $login) {
        id
      }
    }`;

  const variables = { login: username };

  try {
    const response = await octokitGraphQL<{ user: { id: string } }>(query, variables);
    return !!response.user.id;
  } catch (error) {
    console.error(`Error checking username ${username}:`, error);
  }
}

