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
  <div
    style={{
      display: "flex",
      gap: "30px",
      padding: "30px",
      alignItems: "flex-start",
    }}
  >
    {show?.poster_path && (
      <img
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
        style={{
          width: "300px",
          borderRadius: "10px",
        }}
      />
    )}

    <div style={{ flex: 1 }}>
      <h1>{show?.name}</h1>

      {show && <TVShowDetails {...show} />}
    </div>
  </div>
);
};

export default TVShowDetailsPage;