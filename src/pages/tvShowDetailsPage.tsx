import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getTVShow } from "../api/tmdb-api";
import TVShowDetails from "../components/tvShowDetails";

const TVShowDetailsPage: React.FC = () => {
  const { id } = useParams();

  const {
    data: show,
    error,
    isLoading,
    isError,
  } = useQuery(
    ["tvShow", id],
    () => getTVShow(id!)
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
    return (
  <>
    <h1>{show?.name}</h1>

    {show && <TVShowDetails {...show} />}
  </>
);
};

export default TVShowDetailsPage;