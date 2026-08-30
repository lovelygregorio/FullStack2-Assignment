import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";

import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TVShowReviews from "../tvShowReviews";
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
  id: number;
}

const styles = {
   detailsPanel: {
    backgroundColor: "#18181f",
    color: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
  },

  chipSet: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 1,
    listStyle: "none",
    padding: "12px 0",
    margin: 0,
    backgroundColor: "transparent",
  },

  chip: {
    backgroundColor: "#24242d",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.12)",

    "& .MuiChip-icon": {
      color: "#ffffff",
    },
  },

  genreLabel: {
    backgroundColor: "#24242d",
    color: "#ffffff",
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.12)",
  },
  fab: {
  position: "fixed",
  top: 50,
  right: 10,
  backgroundColor: "#18181f",
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "none",

  "&:hover": {
    backgroundColor: "#30303a",
    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
  },
},
};

const TVShowDetails: React.FC<TVShowDetailsProps> = (show) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Paper sx={styles.detailsPanel}>
      <Typography
        variant="h5"
        component="h3"
        sx={{
          marginBottom: "8px",
          fontWeight: 600,
        }}
      >
        Overview
      </Typography>

      <Typography variant="body1" component="p"
        sx={{
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.7,
          marginBottom: "18px",
        }}
      >
        {show.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip
            label="Genres"
            sx={styles.genreLabel}
            color="primary"
          />
        </li>

        {show.genres?.map((genre) => (
          <li key={genre.id}>
            <Chip label={genre.name} sx={styles.chip} />
          </li>
        ))}
      </Paper>

      <Paper component="ul"  elevation={0} sx={{...styles.chipSet, 
        borderTop: "1px solid rgba(255,255,255,0.1)",
          marginTop: "8px",
          paddingTop: "18px",
      }}>
        <Chip
          icon={<StarRate />}
          label={`${show.vote_average} (${show.vote_count})`}
           sx={styles.chip}
        />

        <Chip
          label={`First aired: ${show.first_air_date}`}
          sx={styles.chip}
        />

        {show.number_of_seasons && (
          <Chip
            label={`Seasons: ${show.number_of_seasons}`}
            sx={styles.chip}
          />
        )}

        {show.number_of_episodes && (
          <Chip
            label={`Episodes: ${show.number_of_episodes}`}
            sx={styles.chip}
          />
        )}

        {show.status && (
          <Chip label={`Status: ${show.status}`} sx={styles.chip} />
        )}
      </Paper>
 
        <Fab
  variant="extended"
  onClick={() => setDrawerOpen(true)}
  sx={styles.fab}
>
  <NavigationIcon sx={{ mr: 1 }} />
  Reviews
</Fab>

<Drawer
  anchor="top"
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
>
  <TVShowReviews id={show.id} />
</Drawer>
    </Paper>

        
  );
};

export default TVShowDetails;