import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { getTVShowReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { Review } from "../../types/interfaces";

interface TVShowReviewsProps {
  id: number;
}

const styles = {
  table: {
    minWidth: 550,
  },
};

const TVShowReviews: React.FC<TVShowReviewsProps> = (show) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getTVShowReviews(show.id).then((reviews) => {
      setReviews(reviews);
    });
  }, [show.id]);

  return (
    <TableContainer component={Paper}>
      <Table sx={styles.table} aria-label="TV show reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell component="th" scope="row">
                {review.author}
              </TableCell>

              <TableCell>{excerpt(review.content)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TVShowReviews;
