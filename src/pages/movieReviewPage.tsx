import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

const MovieReviewPage: React.FC = () => {
  const location = useLocation();
  const movie = location.state?.movie;
  const review = location.state?.review;

  if (!movie || !review) {
    return <h1>No movie review selected.</h1>;
  }

  return (
    <PageTemplate movie={movie}>
      <MovieReview {...review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;