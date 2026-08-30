import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";

import SiteHeader from "./components/siteHeader";
import MoviesContextProvider from "./contexts/moviesContext";

import TVShowsPage from "./pages/tvShowsPage";
import TVShowDetailsPage from "./pages/tvShowDetailsPage";
import LandingPage from "./pages/landingPage";
import AddTVShowReviewPage from "./pages/addTVShowReviewPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesContextProvider>
          <SiteHeader />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/movies" element={<HomePage />} />

            <Route path="/movies/:id" element={<MoviePage />} />

            <Route
              path="/movies/favourites"
              element={<FavouriteMoviesPage />}
            />

            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />

            <Route path="/reviews/form" element={<AddMovieReviewPage />} />

            <Route path="/reviews/:id" element={<MovieReviewPage />} />

            <Route path="/tvshows" element={<TVShowsPage />} />

            <Route path="/tvshows/:id" element={<TVShowDetailsPage />} />
            <Route path="/tvreviews/form" element={<AddTVShowReviewPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
