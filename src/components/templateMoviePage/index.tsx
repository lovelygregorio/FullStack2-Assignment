import React, { useState, useEffect } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({
  movie,
  children,
}) => {
  const [images, setImages] = useState<MovieImage[]>([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    getMovieImages(movie.id).then((images) => {
      setImages(images);
    });
  }, [movie.id]);

  const handlePrevious = () => {
    setCurrentImage((prev) =>
      prev === 0 ? Math.max(images.length - 3, 0) : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev >= images.length - 3 ? 0 : prev + 1));
  };

  const visibleImages = images.slice(currentImage, currentImage + 3);

  return (
    <>
      <MovieHeader {...movie} />

      <Grid
        container
        sx={{
          padding: "30px",
          backgroundColor: "#0f0f14",
          color: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <Grid item xs={12}>
          {images.length > 0 && (
            <div
              style={{
                position: "relative",
                maxWidth: "1100px",
                margin: "0 auto",
                padding: "0 55px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                {visibleImages.map((image) => (
                  <img
                    key={image.file_path}
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    alt={movie.title}
                    style={{
                      width: "30%",
                      maxWidth: "300px",
                      height: "420px",
                      objectFit: "cover",
                      borderRadius: "14px",
                    }}
                  />
                ))}
              </div>

              <IconButton
                onClick={handlePrevious}
                sx={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.16)",
                  },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.16)",
                  },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            maxWidth: "1100px",
            margin: "35px auto 0",
            width: "100%",
          }}
        >
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
