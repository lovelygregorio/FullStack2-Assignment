import type { ReactNode } from "react";

export interface BaseMovieProps {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
}
export interface TVShowProps {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  first_air_date: string;
  genre_ids?: number[];
  vote_average: number;
  vote_count?: number;
  popularity?: number;
  original_language?: string;
  original_name?: string;
  origin_country?: string[];
}

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (movie: BaseMovieProps) => ReactNode;
}

export interface MovieDetailsProps extends BaseMovieProps {
  genres: {
    id: number;
    name: string;
  }[];

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface MovieListPageTemplateProps
  extends BaseMovieListProps {
  title: string;
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export interface Review {
  id?: string;
  author: string;
  content: string;
  agree: boolean;
  rating: number;
  movieId: number;
}

export type FilterOption = "title" | "genre";

export interface GenreData {
  genres: {
    id: number;
    name: string;
  }[];
}

export interface DiscoverMovies {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}
export interface DiscoverTVShows {
  page: number;
  results: TVShowProps[];
  total_pages: number;
  total_results: number;
}
export interface TVReview {
  id?: string;
  author: string;
  content: string;
  rating: number;
  agree: boolean;
  tvShowId: number;
}