import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { MoviesContext } from "../../contexts/moviesContext";
import { TVShowProps } from "../../types/interfaces";

const RemoveTVFromFavourites: React.FC<TVShowProps> = (show) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeTVFromFavourites(show);
  };

  return (
    <IconButton
      aria-label="remove TV show from favorites"
      onClick={onUserRequest}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveTVFromFavourites;
