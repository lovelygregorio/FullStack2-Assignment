import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
    padding: "20px 30px",
    backgroundColor: "#18181f",
    color: "#ffffff",
    borderRadius: 0,
    boxShadow: "none",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
};

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = (headerProps) => {
    const title = headerProps.title

   return (
  <Paper component="div" sx={styles.root}>
    <Typography
      variant="h4"
      component="h3"
      sx={{
        fontWeight: 700,
        letterSpacing: "0.5px",
      }}
    >
      {title}
    </Typography>
  </Paper>
);
};

export default Header;
