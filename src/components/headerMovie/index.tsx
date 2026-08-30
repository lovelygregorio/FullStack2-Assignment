import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { MovieDetailsProps } from "../../types/interfaces";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    flexWrap: "wrap",
    padding: "22px 28px",
    backgroundColor: "#18181f",
    color: "#ffffff",
    borderRadius: 0,
    boxShadow: "none",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const MovieHeader: React.FC<MovieDetailsProps> = (movie) => {
  const favouriteIds: number[] = JSON.parse(
    localStorage.getItem("movieFavourites") || "[]",
  );

  const isFavourite = favouriteIds.includes(movie.id);
  return (
    <Paper component="div" sx={styles.root}>
      {isFavourite && (
        <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar>
      )}

      <div>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {movie.title}

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#ffffff",
                fontSize: "14px",
                textDecoration: "none",
                marginLeft: "12px",
                opacity: 0.7,
              }}
            >
              Official Website
            </a>
          )}
        </Typography>

        {movie.tagline && (
          <Typography
            variant="h6"
            sx={{
              marginTop: 0.5,
              color: "rgba(255,255,255,0.65)",
              fontStyle: "italic",
            }}
          >
            {movie.tagline}
          </Typography>
        )}
      </div>
    </Paper>
  );
};

export default MovieHeader;
