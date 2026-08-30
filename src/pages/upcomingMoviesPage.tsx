import React from "react";
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { getUpcomingMovies, getOnTheAirTVShows } from "../api/tmdb-api";

import MovieCard from "../components/movieCard";
import TVShowCard from "../components/tvShowCard";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

import { BaseMovieProps, TVShowProps } from "../types/interfaces";

const UpcomingMoviesPage: React.FC = () => {
  const {
    data: movies,
    isLoading: moviesLoading,
    isError: moviesError,
  } = useQuery<BaseMovieProps[], Error>("upcomingMovies", getUpcomingMovies);

  const {
    data: tvShows,
    isLoading: tvLoading,
    isError: tvError,
  } = useQuery<TVShowProps[], Error>("onTheAirTVShows", getOnTheAirTVShows);

  if (moviesLoading || tvLoading) {
    return <Spinner />;
  }

  if (moviesError || tvError) {
    return <h1>Error loading upcoming content.</h1>;
  }

  const upcomingMovies = (movies || []).slice(0, 6);
  const onTheAirTVShows = (tvShows || []).slice(0, 6);

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
          Upcoming
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "rgba(255,255,255,0.65)",
            marginBottom: "40px",
          }}
        >
          Discover upcoming movies and TV shows currently on the air.
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            marginBottom: "22px",
          }}
        >
          Upcoming Movies
        </Typography>

        <Grid container spacing={3} sx={{ marginBottom: "55px" }}>
          {upcomingMovies.map((movie) => (
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
          On The Air TV Shows
        </Typography>

        <Grid container spacing={3}>
          {onTheAirTVShows.map((show) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={show.id}>
              <TVShowCard show={show} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UpcomingMoviesPage;
