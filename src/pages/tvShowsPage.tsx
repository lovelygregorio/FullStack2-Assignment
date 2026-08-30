import React, { useState } from "react";
import { useQuery } from "react-query";

import { getTVShows, getTVGenres } from "../api/tmdb-api";
import { DiscoverTVShows, TVShowProps } from "../types/interfaces";

import Grid from "@mui/material/Grid";
import TVShowCard from "../components/tvShowCard";
import useFiltering from "../hooks/useFiltering";

import TVShowFilterUI from "../components/tvShowFilterUI";
import Pagination from "@mui/material/Pagination";


const TVShowsPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<DiscoverTVShows, Error>(
    ["tvShows", page],
    () => getTVShows(page)
  );
  const {
    data: genreData,
  } = useQuery(
    "tvGenres",
    getTVGenres
  );

  const filters = [
    {
      name: "name",
      value: "",
      condition: (show: TVShowProps, value: string) =>
        show.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      name: "genre",
      value: "0",
      condition: (show: TVShowProps, value: string) => {
        const genreId = Number(value);

        return genreId > 0 && show.genre_ids
          ? show.genre_ids.includes(genreId)
          : true;
      },
    },
  ];

  const { filterValues, setFilterValues, filterFunction,
  } = useFiltering(filters);

  const changeFilterValues = (type: "name" | "genre", value: string) => {
    const changedFilter = {
      name: type,
      value,
    };

    const updatedFilterSet =
      type === "name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];

    setFilterValues(updatedFilterSet);
  };

  const [sortOption, setSortOption] = useState("rating-desc");

  const displayedShows = data
    ? [...filterFunction(data.results)]
      .slice(0, 18)
      .sort((a, b) => {
        if (sortOption === "rating-desc") {
          return b.vote_average - a.vote_average;
        }

        if (sortOption === "rating-asc") {
          return a.vote_average - b.vote_average;
        }

        if (sortOption === "name-asc") {
          return a.name.localeCompare(b.name);
        }

        return 0;
      })
    : [];


  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div
      style={{
        backgroundColor: "#0f0f14",
        minHeight: "100vh",
        padding: "20px",
        color: "#ffffff",
      }}
    >
      <h1>TV Shows</h1>


      <Grid container spacing={2} sx={{ padding: "20px 0" }}>
        {displayedShows.map((show: TVShowProps) => (
          <Grid item key={show.id} xs={12} sm={6} md={4} lg={2} xl={2}>
            <TVShowCard show={show} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.min(data?.total_pages ?? 1, 500)}
        page={page}
        onChange={(_event, value) => setPage(value)}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",

          "& .MuiPaginationItem-root": {
            color: "#ffffff",
          },

          "& .Mui-selected": {
            backgroundColor: "rgba(255,255,255,0.15) !important",
          },
        }}
      />
      <TVShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        sortOption={sortOption}
        onSortChange={setSortOption}
        genres={genreData?.genres ?? []}
      />
    </div>
  );
};

export default TVShowsPage;