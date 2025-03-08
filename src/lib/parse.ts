// Parsing the raw contribution data into a more structured format expected by ActivityCalendar
import { ContributionCalendar } from "@/utils/types";

export function parseContributionData(contributionData: ContributionCalendar) {
    const calendarData = [];

    if (!contributionData || !contributionData.weeks) {
        return [];
    }

    // Process each week's contribution data
    for (const week of contributionData.weeks) {
        // Process each day in the week
        for (const day of week.contributionDays) {
            if (day.date && typeof day.contributionCount === 'number') {
                // Determine level based on contribution count (0-4 scale)
                let level = 0;
                if (day.contributionCount > 0) {
                    level = Math.min(Math.ceil(day.contributionCount / 5), 4);
                }

                calendarData.push({
                    date: day.date,
                    count: day.contributionCount,
                    level: level
                });
            }
        }
    }
    return calendarData;
}