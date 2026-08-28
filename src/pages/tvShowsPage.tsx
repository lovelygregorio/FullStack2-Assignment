import React, { useState } from "react";
import { useQuery } from "react-query";

import { getTVShows, getTVGenres } from "../api/tmdb-api";
import { DiscoverTVShows, TVShowProps } from "../types/interfaces";

import Grid from "@mui/material/Grid";
import TVShowCard from "../components/tvShowCard";
import useFiltering from "../hooks/useFiltering";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
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

  const {
    filterValues,
    setFilterValues,
    filterFunction,
  } = useFiltering(filters);

  const [sortOption, setSortOption] = useState("rating-desc");
  const displayedShows = data
  ? [...filterFunction(data.results)].sort((a, b) => {
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
  <>
    <h1>TV Shows</h1>



<input
  type="text"
  placeholder="Search TV shows"
  value={filterValues[0].value}
  onChange={(e) =>
    setFilterValues([
      {
        ...filterValues[0],
        value: e.target.value,
      },
      filterValues[1],
    ])
  }
/>

<TextField
  select
  label="Genre"
  value={filterValues[1].value}
  onChange={(e) =>
    setFilterValues([
      filterValues[0],
      {
        ...filterValues[1],
        value: e.target.value,
      },
    ])
  }
  sx={{ minWidth: 200, marginLeft: "20px" }}
>
  <MenuItem value="0">All Genres</MenuItem>

  {genreData?.genres?.map((genre: { id: number; name: string }) => (
    <MenuItem key={genre.id} value={genre.id.toString()}>
      {genre.name}
    </MenuItem>
  ))}
</TextField>


<TextField
  select
  label="Sort"
  value={sortOption}
  onChange={(e) => setSortOption(e.target.value)}
  sx={{ minWidth: 200, marginLeft: "20px" }}
>
  <MenuItem value="rating-desc">Rating: High to Low</MenuItem>
  <MenuItem value="rating-asc">Rating: Low to High</MenuItem>
  <MenuItem value="name-asc">Name: A to Z</MenuItem>
</TextField>

    <Grid container spacing={3} sx={{ padding: "20px" }}>
      {displayedShows.map((show: TVShowProps) => (
        <Grid item key={show.id} xs={12} sm={6} md={4} lg={3}>
          <TVShowCard show={show} />
        </Grid>
      ))}
    </Grid>

    <Pagination
  count={data?.total_pages || 1}
  page={page}
  onChange={(_event, value) => setPage(value)}
  sx={{
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  }}
/>
  </>
);
};

export default TVShowsPage;