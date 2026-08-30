import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

import img from "../../images/film-poster-placeholder.png";
import { TVShowProps } from "../../types/interfaces";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { MoviesContext } from "../../contexts/moviesContext";

interface TVShowCardProps {
  show: TVShowProps;
  showFavourite?: boolean;
  action?: (show: TVShowProps) => React.ReactNode;
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

  hoverDetails: {
    opacity: 0,
    maxHeight: 0,
    overflow: "hidden",
    transition: "all 0.25s ease",
  },
};

const TVShowCard: React.FC<TVShowCardProps> = ({
  show,
  showFavourite = true,
  action,
}) => {
  const { tvFavourites, addTVToFavourites, removeTVFromFavourites } =
    useContext(MoviesContext);

  const isFavourite = tvFavourites.includes(show.id);
  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          showFavourite && isFavourite ? (
            <Avatar sx={{ backgroundColor: "red" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            {show.name}
          </Typography>
        }
      />

      <CardMedia
        sx={styles.media}
        image={
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : img
        }
        title={show.name}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2" component="p">
              <CalendarIcon fontSize="small" /> {show.first_air_date}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" /> {show.vote_average}
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
            {show.overview}
          </Typography>
        </div>
      </CardContent>

      <CardActions disableSpacing>
        {action && action(show)}
        {showFavourite && (
          <IconButton
            aria-label={
              isFavourite
                ? "remove TV show from favorites"
                : "add TV show to favorites"
            }
            onClick={() =>
              isFavourite
                ? removeTVFromFavourites(show)
                : addTVToFavourites(show)
            }
            sx={{
              color: isFavourite ? "#ff0000" : "#ffffff",
            }}
          >
            <FavoriteIcon />
          </IconButton>
        )}

        <Button
          component={Link}
          to={`/tvshows/${show.id}`}
          variant="outlined"
          size="small"
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

export default TVShowCard;
