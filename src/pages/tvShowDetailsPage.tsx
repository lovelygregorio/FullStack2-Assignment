import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getTVShow, getTVShowImages } from "../api/tmdb-api";
import TVShowDetails from "../components/tvShowDetails";
import { MovieImage } from "../types/interfaces";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TVShowHeader from "../components/headerTVShow";
import Spinner from "../components/spinner";

const styles = {
  page: {
    backgroundColor: "#0f0f14",
    minHeight: "100vh",
    color: "#ffffff",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px",
  },

  imageSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap" as const,
    marginBottom: "40px",
  },
  arrowButton: {
    backgroundColor: "#24242d",
    color: "#ffffff",
    width: "42px",
    height: "42px",
    "&:hover": {
      backgroundColor: "#34343f",
    },
  },
};

const TVShowDetailsPage: React.FC = () => {
  const { id } = useParams();

  const [images, setImages] = useState<MovieImage[]>([]);
  const [currentImage, setCurrentImage] = useState(0);

  const {
    data: show,
    error,
    isLoading,
    isError,
  } = useQuery(
    ["tvShow", id],
    () => getTVShow(id!)
  );
  useEffect(() => {
    if (show?.id) {
      getTVShowImages(show.id).then((images) => {
        setImages(images);
      });
    }
  }, [show?.id]);


  const handlePrevious = () => {
    setCurrentImage((prev) =>
      prev === 0 ? Math.max(images.length - 3, 0) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prev) =>
      prev >= images.length - 3 ? 0 : prev + 1
    );
  };

  const visibleImages = images.slice(
    currentImage,
    currentImage + 3
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  if (!show) {
    return <h1>TV show not found.</h1>;
  }
  return (

    <div style={styles.page}>
      <TVShowHeader
        name={show.name}
        homepage={show.homepage}
        tagline={show.tagline}
      />

      <div style={styles.container}>
        <div style={styles.imageSection}>
          <IconButton
            onClick={handlePrevious}
            sx={styles.arrowButton}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {visibleImages.map((image) => (
            <img
              key={image.file_path}
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt={show.name}
              style={{
                width: "230px",
                height: "360px",
                objectFit: "cover",
                borderRadius: "14px",
              }}
            />
          ))}

          <IconButton
            onClick={handleNext}
            sx={styles.arrowButton}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>


        <TVShowDetails {...show} />
      </div>
    </div>
  );
};
export default TVShowDetailsPage;