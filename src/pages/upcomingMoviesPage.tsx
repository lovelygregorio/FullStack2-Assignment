import React, { useState } from "react";
import { useQuery } from "react-query";

import PageTemplate from "../components/templateMovieListPage";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

import useFiltering from "../hooks/useFiltering";
import { getUpcomingMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";


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

const UpcomingMoviesPage: React.FC = () => {
  const [sortOption, setSortOption] = useState("rating-desc");

  const {
    data: movies,
    error,
    isLoading,
    isError,
  } = useQuery<BaseMovieProps[], Error>(
    "upcoming",
    getUpcomingMovies
  );

  const {
    filterValues,
    setFilterValues,
    filterFunction,
  } = useFiltering([titleFiltering, genreFiltering]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

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

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => (
          <AddToPlaylistIcon {...movie} />
        )}
      />

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

export default UpcomingMoviesPage;