import React, { useCallback, useEffect, useState } from "react";
import {
  BaseMovieProps,
  Review,
  TVShowProps,
  TVReview,
} from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  myReviews: Record<number, Review>;
  myTVReviews: Record<number, TVReview>;
  tvFavourites: number[];

  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;

  addTVToFavourites: (show: TVShowProps) => void;
  removeTVFromFavourites: (show: TVShowProps) => void;

  addReview: (movie: BaseMovieProps, review: Review) => void;
  addTVReview: (show: TVShowProps, review: TVReview) => void;
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  myReviews: {},
  myTVReviews: {},
  tvFavourites: [],

  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: () => {},
  addTVToFavourites: () => {},
  removeTVFromFavourites: () => {},
  addTVReview: () => {},
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<number[]>(() => {
    const stored = localStorage.getItem("movieFavourites");
    return stored ? JSON.parse(stored) : [];
  });

  const [myReviews, setMyReviews] = useState<Record<number, Review>>({});
  const [myTVReviews, setMyTVReviews] = useState<Record<number, TVReview>>({});

  const [tvFavourites, setTVFavourites] = useState<number[]>(() => {
    const stored = localStorage.getItem("tvFavourites");
    return stored ? JSON.parse(stored) : [];
  });

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((previousFavourites) => {
      if (previousFavourites.includes(movie.id)) {
        return previousFavourites;
      }

      return [...previousFavourites, movie.id];
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("movieFavourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem("tvFavourites", JSON.stringify(tvFavourites));
  }, [tvFavourites]);

  const addTVToFavourites = useCallback((show: TVShowProps) => {
    setTVFavourites((previousFavourites) => {
      if (previousFavourites.includes(show.id)) {
        return previousFavourites;
      }

      return [...previousFavourites, show.id];
    });
  }, []);

  const removeTVFromFavourites = useCallback((show: TVShowProps) => {
    setTVFavourites((previousFavourites) =>
      previousFavourites.filter((showId) => showId !== show.id),
    );
  }, []);

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((previousFavourites) =>
      previousFavourites.filter((movieId) => movieId !== movie.id),
    );
  }, []);

  const addReview = useCallback((movie: BaseMovieProps, review: Review) => {
    setMyReviews((previousReviews) => ({
      ...previousReviews,
      [movie.id]: review,
    }));
  }, []);

  const addTVReview = useCallback((show: TVShowProps, review: TVReview) => {
    setMyTVReviews((previousReviews) => ({
      ...previousReviews,
      [show.id]: review,
    }));
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        tvFavourites,
        myTVReviews,
        addTVReview,
        myReviews,
        addToFavourites,
        removeFromFavourites,
        addTVToFavourites,
        removeTVFromFavourites,
        addReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
