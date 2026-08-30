import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { TVShowProps } from "../../types/interfaces";
import { Link } from "react-router-dom";

const WriteTVReviewIcon: React.FC<TVShowProps> = (show) => {
  return (
    <Link
      to="/tvreviews/form"
      state={{
        tvShowId: show.id,
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteTVReviewIcon;
