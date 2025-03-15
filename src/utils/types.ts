export interface ContributionDay {
    date: string;
    contributionCount: number;
}

export interface ContributionWeek {
    contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}


export type UserProfileType = {
  name: string;
  bio: string;
  avatarUrl: string;
  location: string;
  email: string;
  websiteUrl: string | null;
  twitterUsername: string;
  company: string | null;
  followers: Count;
  following: Count;
  starredRepositories: Count;
  repositories: Count;
};

type Count = {
  totalCount: number;
};
