import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Pagination from "@mui/material/Pagination";


const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};
const HomePage: React.FC = () => {
  const [sortOption, setSortOption] = useState("rating-desc");
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } =
    useQuery<DiscoverMovies, Error>(["discover", page], () => getMovies(page));

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (
    type: string,
    value: string
  ) => {
    const changedFilter = {
      name: type,
      value,
    };

    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];

    setFilterValues(updatedFilterSet);
  };
  const movies = data ? data.results.slice(0, 18) : [];

  const displayedMovies = [...filterFunction(movies)].sort((a, b) => {
    if (sortOption === "rating-desc") {
      return b.vote_average - a.vote_average;
    }

    if (sortOption === "rating-asc") {
      return a.vote_average - b.vote_average;
    }

    if (sortOption === "title-asc") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => (
          <AddToFavouritesIcon {...movie} />
        )}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "25px",
          backgroundColor: "#0f0f14",
        }}
      >
        <Pagination
          page={page}
          count={Math.min(data?.total_pages ?? 1, 500)}
          onChange={(_, value) => setPage(value)}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#ffffff",
            },
          }}
        />
      </div>

      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
    </>
  );
};

export default HomePage;