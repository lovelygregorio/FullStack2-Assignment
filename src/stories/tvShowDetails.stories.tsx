import type { Meta, StoryObj } from "@storybook/react";
import TVShowDetails from "../components/tvShowDetails";

const meta = {
  title: "TV Shows/TVShowDetails",
  component: TVShowDetails,
} satisfies Meta<typeof TVShowDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 5920,
    overview:
      "Patrick Jane, a former celebrity psychic, uses his exceptional observation skills to help the California Bureau of Investigation solve crimes.",
    genres: [
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
      { id: 9648, name: "Mystery" },
    ],
    first_air_date: "2008-09-23",
    vote_average: 8.4,
    vote_count: 3800,
    number_of_seasons: 7,
    number_of_episodes: 151,
    status: "Ended",
  },
};
