import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

import img from "../../images/film-poster-placeholder.png";
import { BaseMovieProps } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";

interface MovieCardProps {
  movie: BaseMovieProps;
  action: (movie: BaseMovieProps) => React.ReactNode;
}
const styles = {
  card: {
    maxWidth: 350,
    margin: "0 auto",
    backgroundColor: "#18181f",
    color: "#ffffff",
    position: "relative",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    zIndex: 1,
    borderRadius: "14px",
    overflow: "hidden",

    "&:hover": {
      transform: "scale(1.12)",
      zIndex: 20,
      boxShadow: "0 18px 40px rgba(0,0,0,0.75)",
    },

    "&:hover .hoverDetails": {
      opacity: 1,
      maxHeight: "140px",
      marginTop: "10px",
    },
  },

  media: {
    height: 320,
  },

  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },

  hoverDetails: {
    opacity: 0,
    maxHeight: 0,
    overflow: "hidden",
    transition: "all 0.25s ease",
  },
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, action }) => {
  const { favourites } = useContext(MoviesContext);

  const isFavourite = favourites.includes(movie.id);

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography
            variant="body1"
            component="p"
            sx={{ fontWeight: 600, fontSize: "0.9rem" }}
          >
            {movie.title}
          </Typography>
        }
      />

      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : img
        }
        title={movie.title}
      />

      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2" component="p">
              <CalendarIcon fontSize="small" /> {movie.release_date}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" /> {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>

        <div className="hoverDetails" style={styles.hoverDetails}>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.overview}
          </Typography>
        </div>
      </CardContent>

      <CardActions disableSpacing>
        {action(movie)}

        <Button
          variant="outlined"
          size="small"
          component={Link}
          to={`/movies/${movie.id}`}
          sx={{
            color: "#ffffff",
            borderColor: "#777777",
            "&:hover": {
              borderColor: "#ffffff",
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          More Info ...
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
