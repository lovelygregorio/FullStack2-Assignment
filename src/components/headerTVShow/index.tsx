import React from "react";
import Typography from "@mui/material/Typography";

interface TVShowHeaderProps {
  name: string;
  homepage?: string;
  tagline?: string;
}

const TVShowHeader: React.FC<TVShowHeaderProps> = ({
  name,
  homepage,
  tagline,
}) => {
  return (
    <div
      style={{
        padding: "20px 30px",
        backgroundColor: "#18181f",
        color: "#ffffff",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 700 }}
        >
          {name}
        </Typography>

        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            Official Website
          </a>
        )}
      </div>

      {tagline && (
        <Typography
          variant="subtitle1"
          sx={{
            marginTop: "6px",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {tagline}
        </Typography>
      )}
    </div>
  );
};

export default TVShowHeader;