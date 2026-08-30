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

type TVFilterOption = "name" | "genre";

interface Genre {
  id: number;
  name: string;
}

interface FilterTVShowsCardProps {
  onUserInput: (filterType: TVFilterOption, value: string) => void;
  titleFilter: string;
  genreFilter: string;
  sortOption: string;
  onSortChange: (value: string) => void;
  genres: Genre[];
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

const FilterTVShowsCard: React.FC<FilterTVShowsCardProps> = ({
  titleFilter,
  genreFilter,
  onUserInput,
  sortOption,
  onSortChange,
  genres,
}) => {
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUserInput("name", event.target.value);
  };

  const handleGenreChange = (event: SelectChangeEvent) => {
    onUserInput("genre", event.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginBottom: 2,
            }}
          >
            <FilterAltIcon />
            Find TV Shows
          </Typography>

          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search by name"
            type="search"
            value={titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />

          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>

            <Select
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              label="Genre"
              onChange={handleGenreChange}
            >
              <MenuItem value="0">All Genres</MenuItem>

              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginBottom: 2,
            }}
          >
            <SortIcon />
            Sort TV Shows
          </Typography>

          <FormControl sx={styles.formControl}>
            <InputLabel id="sort-label">Sort By</InputLabel>

            <Select
              labelId="sort-label"
              value={sortOption}
              label="Sort By"
              onChange={(event) => onSortChange(event.target.value)}
            >
              <MenuItem value="rating-desc">Rating: High to Low</MenuItem>

              <MenuItem value="rating-asc">Rating: Low to High</MenuItem>

              <MenuItem value="name-asc">Name: A-Z</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterTVShowsCard;
