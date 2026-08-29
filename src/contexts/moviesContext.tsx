import React, { useCallback, useState } from "react";
import { BaseMovieProps, Review,  TVShowProps } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  mustWatch: number[];
  myReviews: Record<number, Review>;
  tvFavourites: number[];

  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  
  addTVToFavourites: (show: TVShowProps) => void;
  removeTVFromFavourites: (show: TVShowProps) => void;
  
  addToMustWatch: (movie: BaseMovieProps) => void;
  addReview: (movie: BaseMovieProps, review: Review) => void;
  

}

const initialContextState: MovieContextInterface = {
  favourites: [],
  mustWatch: [],
  myReviews: {},
  tvFavourites: [],

  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addToMustWatch: () => {},
  addReview: () => {},
  addTVToFavourites: () => {},
  removeTVFromFavourites: () => {},
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [mustWatch, setMustWatch] = useState<number[]>([]);
  const [myReviews, setMyReviews] = useState<Record<number, Review>>({});
  const [tvFavourites, setTVFavourites] = useState<number[]>([]);
  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((previousFavourites) => {
      if (previousFavourites.includes(movie.id)) {
        return previousFavourites;
      }

      return [...previousFavourites, movie.id];
    });
  }, []);

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
    previousFavourites.filter(
      (showId) => showId !== show.id
    )
  );
}, []);

  const removeFromFavourites = useCallback(
    (movie: BaseMovieProps) => {
      setFavourites((previousFavourites) =>
        previousFavourites.filter(
          (movieId) => movieId !== movie.id
        )
      );
    },
    []
  );

  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((previousMustWatch) => {
      if (previousMustWatch.includes(movie.id)) {
        return previousMustWatch;
      }

      const updatedMustWatch = [
        ...previousMustWatch,
        movie.id,
      ];

      console.log("Must watch movie IDs:", updatedMustWatch);

      return updatedMustWatch;
    });
  }, []);

  const addReview = useCallback(
    (movie: BaseMovieProps, review: Review) => {
      setMyReviews((previousReviews) => ({
        ...previousReviews,
        [movie.id]: review,
      }));
    },
    []
  );

  return (
    <MoviesContext.Provider
      value={{
        favourites,
         tvFavourites,
        mustWatch,
        myReviews,
        addToFavourites,
        removeFromFavourites,
        addTVToFavourites,
        removeTVFromFavourites,
        addToMustWatch,
        addReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;