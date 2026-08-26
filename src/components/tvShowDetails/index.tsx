import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";

interface TVGenre {
  id: number;
  name: string;
}

interface TVShowDetailsProps {
  overview: string;
  genres: TVGenre[];
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status?: string;
}

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },

  chipLabel: {
    margin: 0.5,
  },
};

const TVShowDetails: React.FC<TVShowDetailsProps> = (show) => {
  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {show.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip
            label="Genres"
            sx={styles.chipLabel}
            color="primary"
          />
        </li>

        {show.genres?.map((genre) => (
          <li key={genre.id}>
            <Chip label={genre.name} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        <Chip
          icon={<StarRate />}
          label={`${show.vote_average} (${show.vote_count})`}
        />

        <Chip
          label={`First aired: ${show.first_air_date}`}
        />

        {show.number_of_seasons && (
          <Chip
            label={`Seasons: ${show.number_of_seasons}`}
          />
        )}

        {show.number_of_episodes && (
          <Chip
            label={`Episodes: ${show.number_of_episodes}`}
          />
        )}

        {show.status && (
          <Chip label={`Status: ${show.status}`} />
        )}
      </Paper>
    </>
  );
};

export default TVShowDetails;