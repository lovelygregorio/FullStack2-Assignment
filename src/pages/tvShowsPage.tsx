import React from "react";
import { useQuery } from "react-query";

import { getTVShows } from "../api/tmdb-api";
import { DiscoverTVShows } from "../types/interfaces";

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

    {data?.results.map((show) => (
      <div key={show.id}>
        <h2>{show.name}</h2>
      </div>
    ))}
  </>
);
};

export default TVShowsPage;