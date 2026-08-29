import React, { ChangeEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
import { useQuery } from "react-query";

import { getGenres } from "../../api/tmdb-api";
import {
  FilterOption,
  GenreData,
} from "../../types/interfaces";
import Spinner from "../spinner";

interface FilterMoviesCardProps {
  onUserInput: (
    filterType: FilterOption,
    value: string
  ) => void;
  titleFilter: string;
  genreFilter: string;
}
const styles = {
  root: {
    width: 320,
    backgroundColor: "#18181f",
    color: "#ffffff",
    border: "none",
    borderRadius: 0,
    boxShadow: "none",
  },

  formControl: {
    marginTop: 2,
    width: "100%",

    "& .MuiInputBase-root": {
      backgroundColor: "#24242d",
      color: "#ffffff",
    },

    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.7)",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#ffffff",
    },

    "& .MuiSvgIcon-root": {
      color: "#ffffff",
    },
  },
};

const FilterMoviesCard: React.FC<
  FilterMoviesCardProps
> = ({
  titleFilter,
  genreFilter,
  onUserInput,
}) => {
  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<GenreData, Error>(
    "genres",
    getGenres
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = [
    { id: 0, name: "All" },
    ...(data?.genres ?? []),
  ];

  const handleChange = (
    type: FilterOption,
    value: string
  ) => {
    onUserInput(type, value);
  };

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    handleChange("title", event.target.value);
  };

  const handleGenreChange = (
    event: SelectChangeEvent
  ) => {
    handleChange("genre", event.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
         <Typography variant="h5" component="h1"
         sx={{
         fontWeight: 700,
         display: "flex",
         alignItems: "center",
         gap: 1,
         marginBottom: 2,
        }}
      >
        <FilterAltIcon />
              Find Movies
        </Typography>

          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search by title"
            type="search"
            value={titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />

          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">
              Genre
            </InputLabel>

            <Select
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              label="Genre"
              onChange={handleGenreChange}
            >
              {genres.map((genre) => (
                <MenuItem
                  key={genre.id}
                  value={genre.id.toString()}
                >
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;