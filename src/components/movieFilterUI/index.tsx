import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps } from "../../types/interfaces";
import FilterListIcon from "@mui/icons-material/FilterList";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
    const genreId = Number(value);
    const genreIds = movie.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

const styles = {
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 20,
    right: 20,
    backgroundColor: "#18181f",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "none",
    textTransform: "none",
    fontWeight: 600,

    "&:hover": {
      backgroundColor: "#24242d",
      boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
    },
  },
};

interface MovieFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    sortOption: string;
onSortChange: (value: string) => void;
}


const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter, sortOption, onSortChange }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Fab
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
            <FilterListIcon sx={{ mr: 1 }} />
                Filters
            </Fab>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                    sortOption={sortOption}
                    onSortChange={onSortChange}
                />
            </Drawer>
        </>
    );
};

export default MovieFilterUI;
