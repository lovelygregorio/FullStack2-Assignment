import React from "react";
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

interface TVShowCardProps {
  show: TVShowProps;
}

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
};

const TVShowCard: React.FC<TVShowCardProps> = ({ show }) => {
  return (
    <Card sx={styles.card}>
      <CardHeader
        title={
          <Typography variant="h5" component="p">
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
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />{" "}
              {show.first_air_date}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />{" "}
              {show.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <Button
          component={Link}
          to={`/tvshows/${show.id}`}
          variant="outlined"
          size="medium"
          color="primary"
        >
          More Info ...
        </Button>
      </CardActions>
    </Card>
  );
};

export default TVShowCard;