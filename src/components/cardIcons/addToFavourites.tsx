import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseMovieProps } from "../../types/interfaces";

const AddToFavouritesIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const isFavourite = context.favourites.includes(movie.id);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isFavourite) {
      context.removeFromFavourites(movie);
    } else {
      context.addToFavourites(movie);
    }
  };

  return (
    <IconButton
      aria-label={isFavourite ? "remove from favorites" : "add to favorites"}
      onClick={onUserSelect}
    >
      <FavoriteIcon
        fontSize="large"
        sx={{
          color: isFavourite ? "#ff0000" : "#ffffff",
          "&:hover": {
            color: isFavourite ? "#ff4d4d" : "#d0d0d0",
          },
        }}
      />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
