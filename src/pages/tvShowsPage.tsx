import React from "react";
import { useQuery } from "react-query";

import { getTVShows } from "../api/tmdb-api";
import { DiscoverTVShows } from "../types/interfaces";

import Grid from "@mui/material/Grid";
import TVShowCard from "../components/tvShowCard";

const TVShowsPage: React.FC = () => {
  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<DiscoverTVShows, Error>(
    "tvShows",
    getTVShows
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


 return (
  <>
    <h1>TV Shows</h1>

    <Grid container spacing={3} sx={{ padding: "20px" }}>
      {data?.results.map((show) => (
        <Grid item key={show.id} xs={12} sm={6} md={4} lg={3}>
          <TVShowCard show={show} />
        </Grid>
      ))}
    </Grid>
  </>
);
};

export default TVShowsPage;