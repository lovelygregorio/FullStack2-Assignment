import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterTVShowsCard from "../filterTVShowsCard";

interface Genre {
  id: number;
  name: string;
}

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

interface TVShowFilterUIProps {
  onFilterValuesChange: (f: "name" | "genre", s: string) => void;
  titleFilter: string;
  genreFilter: string;
  sortOption: string;
  onSortChange: (value: string) => void;
  genres: Genre[];
}

const TVShowFilterUI: React.FC<TVShowFilterUIProps> = ({
  onFilterValuesChange,
  titleFilter,
  genreFilter,
  sortOption,
  onSortChange,
  genres,
}) => {
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
        <FilterTVShowsCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          sortOption={sortOption}
          onSortChange={onSortChange}
          genres={genres}
        />
      </Drawer>
    </>
  );
};

export default TVShowFilterUI;
