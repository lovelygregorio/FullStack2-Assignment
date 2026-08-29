import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MovieDetailsProps } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews'

const styles = {
  detailsContainer: {
    backgroundColor: "#18181f",
    borderRadius: "16px",
    padding: "28px",
    color: "#ffffff",
    marginTop: "25px",
    marginBottom: "30px",
  },

  chipSet: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 1,
    listStyle: "none",
    padding: "14px",
    marginTop: "15px",
    marginBottom: "10px",
    backgroundColor: "#22222b",
    borderRadius: "12px",
    boxShadow: "none",
  },

    chipLabel: {
    margin: 0.5,
    color: "#ffffff",
    backgroundColor: "#30303a",
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

const MovieDetails: React.FC<MovieDetailsProps> = (movie) => {

    const [drawerOpen, setDrawerOpen] = useState(false); // New

    return (
        <div style={styles.detailsContainer}>

            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {movie.genres.map((g) => (
            <li key={g.name}>
            <Chip label={g.name} sx={styles.chipLabel}/>
                </li>
            ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} 
                label={`${movie.runtime} min.`} sx={styles.chipLabel} />

                <Chip   icon={<MonetizationIcon />} 
                label={`${movie.revenue.toLocaleString()}`} sx={styles.chipLabel} />

                <Chip   icon={<StarRate />}
                label={`${movie.vote_average} (${movie.vote_count})`}
                sx={styles.chipLabel}/>

                <Chip    label={`Released: ${movie.release_date}`}
                  sx={styles.chipLabel}/>
            </Paper>
            <Fab
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon sx={{ mr: 1 }} />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews {...movie} />
            </Drawer>
             </div>
            );
            };
       
export default MovieDetails;
