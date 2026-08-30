import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getTVShow, getTVShowImages } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import TVShowReviewForm from "../components/tvShowReviewForm/index";
import HeaderTVShow from "../components/headerTVShow";

const AddTVShowReviewPage: React.FC = () => {
  const location = useLocation();
  const [startIndex, setStartIndex] = useState(0);

  const tvShowId = location.state?.tvShowId;

  const {
    data: show,
    isLoading,
    isError,
  } = useQuery(
    ["tvShow", tvShowId],
    () => getTVShow(tvShowId.toString()),
    {
      enabled: Boolean(tvShowId),
    }
  );

  const { data: images } = useQuery(
    ["tvShowImages", tvShowId],
    () => getTVShowImages(tvShowId.toString()),
    {
      enabled: Boolean(tvShowId),
    }
  );


  if (!tvShowId) {
    return <h2>No TV show selected.</h2>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !show) {
    return <h2>Unable to load TV show.</h2>;
  }

  const posters = images || [];


  const visiblePosters = posters.slice(
    startIndex,
    startIndex + 3
  );

  const handlePrevious = () => {
    setStartIndex((previous) =>
      Math.max(previous - 1, 0)
    );
  };

  const handleNext = () => {
    setStartIndex((previous) =>
      Math.min(
        previous + 1,
        Math.max(posters.length - 3, 0)
      )
    );
  };


  return (
    <Box
      sx={{
        backgroundColor: "#111111",
        minHeight: "100vh",
        color: "#ffffff",
        padding: "40px",
        paddingTop: "80px",
      }}
    >
      <HeaderTVShow
        name={show.name}
        homepage={show.homepage}
        tagline={show.tagline}
      />

      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          py: 3,
          minHeight: "370px",
        }}
      >
        <IconButton
          onClick={handlePrevious}
          disabled={startIndex === 0}
          sx={{
            color: "#ffffff",
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {visiblePosters.map(
          (
            image: { file_path: string },
            index: number
          ) => (
            <Box
              key={`${image.file_path}-${index}`}
              component="img"
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt={`${show.name} poster`}
              sx={{
                width: "190px",
                height: "285px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )
        )}

        <IconButton
          onClick={handleNext}
          disabled={
            startIndex >= posters.length - 3
          }
          sx={{
            color: "#ffffff",
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          px: 3,
          pb: 6,
        }}
      >
        <TVShowReviewForm show={show} />
      </Box>
    </Box>
  );
};

export default AddTVShowReviewPage;