import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useQuery } from "react-query";

import { getTopMovies, getTopTVShows } from "../api/tmdb-api";
import MovieCard from "../components/movieCard";
import TVShowCard from "../components/tvShowCard";
import { BaseMovieProps, TVShowProps } from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const LandingPage: React.FC = () => {
  const {
    data: movies,
    isLoading: moviesLoading,
    isError: moviesError,
  } = useQuery("topMovies", getTopMovies);

  const {
    data: tvShows,
    isLoading: tvLoading,
    isError: tvError,
  } = useQuery("topTVShows", getTopTVShows);

  if (moviesLoading || tvLoading) {
    return (
      <Box
        sx={{
          backgroundColor: "#0f0f14",
          color: "#ffffff",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        Loading...
      </Box>
    );
  }

  if (moviesError || tvError) {
    return (
      <Box
        sx={{
          backgroundColor: "#0f0f14",
          color: "#ffffff",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        Error loading content.
      </Box>
    );
  }

  const topMovies = (movies || []).slice(0, 6);
  const topTVShows = (tvShows || []).slice(0, 6);

  return (
    <Box
      sx={{
        backgroundColor: "#0f0f14",
        color: "#ffffff",
        minHeight: "100vh",
        padding: "40px 30px",
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          Welcome to LULU PRIME
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "rgba(255,255,255,0.65)",
            marginBottom: "40px",
          }}
        >
          Discover top-rated movies and TV shows.
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            marginBottom: "22px",
          }}
        >
          Top Movies
        </Typography>

        <Grid container spacing={3} sx={{ marginBottom: "55px" }}>
          {topMovies.map((movie: BaseMovieProps) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={movie.id}>
              <MovieCard
                movie={movie}
                action={(movie: BaseMovieProps) => (
                  <AddToFavouritesIcon {...movie} />
                )}
              />
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            marginBottom: "22px",
          }}
        >
          Top TV Shows
        </Typography>

        <Grid container spacing={3}>
          {topTVShows.map((show: TVShowProps) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={show.id}>
              <TVShowCard show={show} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LandingPage;