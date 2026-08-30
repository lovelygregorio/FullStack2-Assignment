import React, { useContext, useState  } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie, getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { BaseMovieProps, TVShowProps } from "../types/interfaces";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TVShowCard from "../components/tvShowCard";
import RemoveTVFromFavourites from "../components/cardIcons/removeTVFromFavourites";
import WriteTVReview from "../components/cardIcons/writeTVReview";

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

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds, tvFavourites: tvShowIds } = useContext(MoviesContext);

  const [sortOption, setSortOption] = useState("rating-desc");

  const {
    filterValues,
    setFilterValues,
    filterFunction,
  } = useFiltering([titleFiltering, genreFiltering]);

  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId.toString()),
    }))
  );

   const favouriteTVQueries = useQueries(
    tvShowIds.map((showId) => ({
      queryKey: ["tvShow", showId],
      queryFn: () =>
        getTVShow(showId.toString()),
    }))
  );


  const isLoading = favouriteMovieQueries.some(
    (query) => query.isLoading
  ) || favouriteTVQueries.some(
    (query) => query.isLoading
  );

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries
    .map((query) => query.data)
    .filter(
      (movie): movie is BaseMovieProps => movie !== undefined
    );

      const favouriteTVShows =
    favouriteTVQueries
      .map((query) => query.data)
      .filter(
        (
          show
        ): show is TVShowProps =>
          show !== undefined
      );


  const displayedMovies = [...filterFunction(allFavourites)].sort((a, b) => {
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
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => (
          <>
            <RemoveFromFavourites {...movie} />
            <WriteReview {...movie} />
          </>
        )}
      />
      
      {favouriteTVShows.length > 0 && (
        <div
          style={{
            backgroundColor: "#0f0f14",
            color: "#ffffff",
            padding: "20px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: "20px",
              fontWeight: 700,
            }}
          >
            Favourite TV Shows
          </Typography>

          <Grid
            container
            spacing={2}
          >
            {favouriteTVShows.map(
              (show) => (
                <Grid item
                  key={show.id} xs={12} sm={6} md={4} lg={2} xl={2}>
                  <TVShowCard
              show={show}
            showFavourite={false}
              action={(show: TVShowProps) => (
              <>
            <RemoveTVFromFavourites {...show} />
             <WriteTVReview {...show} />
            </>
          )}
          />
                </Grid>
              )
            )}
          </Grid>
        </div>
      )}

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

export default FavouriteMoviesPage;