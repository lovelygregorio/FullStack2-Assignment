import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
  },
};

const CircularIndeterminate: React.FC = () => {
  return (
    <div style={styles.root}>
      <CircularProgress />
    </div>
  );
};

export default CircularIndeterminate;