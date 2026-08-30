import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import TVShowCard from "../components/tvShowCard";

const sampleTVShow = {
  id: 5920,
  name: "The Mentalist",
  overview:
    "Patrick Jane uses his sharp skills of observation to solve serious crimes.",
  poster_path: "/acYXu4KaDj1NIkMgObnhe4C4a0T.jpg",
  first_air_date: "2008-09-23",
  genre_ids: [80, 18, 9648],
  vote_average: 8.4,
};

const meta = {
  title: "TV Shows/TVShowCard",
  component: TVShowCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof TVShowCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    show: sampleTVShow,
  },
};

const sampleNoPoster = {
  ...sampleTVShow,
  poster_path: null,
};

export const Exceptional: Story = {
  args: {
    show: sampleNoPoster,
  },
};

Exceptional.storyName = "No Poster";

Basic.storyName = "Default";
