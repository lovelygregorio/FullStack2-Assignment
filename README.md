# LULU PRIME – Movie and TV Show Database App

LULU PRIME is a React and TypeScript single-page application developed for the Full Stack Web Development 2 assignment.

## Live Demo

Application is deployed on Vercel
https://luluprime.vercel.app/
Youtube Demo url: https://youtu.be/aXZ9D62NQAA

## Project Origin

This project is based on the Movies Fan App developed through the Full Stack Web Development 2 course labs. The lab application provided the foundation and core movie functionality used as the starting point for this assignment.

For this assignment, the application was extended and customised with additional functionality, including TV shows as a new entity, new pages and parameterized routes, filtering and sorting, pagination, movie and TV favourites, reviews, Storybook coverage, and a custom LULU PRIME user interface.

The sections below describe the features and extensions implemented in the completed application.

## Features

The application uses the TMDB API to allow users to discover movies and TV shows, view detailed information, manage favourites, browse upcoming content, filter and sort results, and submit reviews.

## Features

### Landing Page
•	Custom LULU PRIME landing page.
•	Displays top-rated movies.
•	Displays top-rated TV shows.
•	Provides navigation to the main areas of the application.

### Movies
•	Browse movies from TMDB.
•	View detailed movie information.
•	Parameterized movie details route.
•	Add and remove movies from favourites.
•	Filter movies by title and genre.
•	Sort movies by rating and title.
•	Pagination support.
•	View movie reviews.
•	Write movie reviews.

### TV Shows
TV Shows were added as an additional entity to the original Movies application.

Features include:
•	Browse TV shows from TMDB.
•	View detailed TV show information.
•	Parameterized TV show details route.
•	View multiple TV show images.
•	View TMDB TV show reviews.
•	Add and remove TV shows from favourites.
•	Write TV show reviews.
•	Filter TV shows by name and genre.
•	Sort TV shows by rating and name.
•	Pagination support.

### Upcoming Content
•	Displays upcoming movies.
•	Displays TV shows currently on the air.

### Favourites
•	Movie favourites.
•	TV show favourites.
•	Favourites are persisted using localStorage.
•	Users can remove items from their favourites collection.

### Filtering and Sorting
Reusable filtering functionality is implemented using a custom React hook.

Movies and TV shows can be filtered and sorted using multiple criteria including:
•	Title or name.
•	Genre.
•	Rating.
•	Alphabetical order.

### Server State and Caching
React Query is used to manage API data and server state.

The application uses:
•	Query caching.
•	Loading and error states.
•	Page-specific query keys.
•	Configured stale time and refetch behaviour.

### Storybook
Storybook is used to develop and test reusable React components independently from the main application.

Stories include movie components and TV show components, including:
•	TV Show Card – Default state.
•	TV Show Card – No Poster state.
•	TV Show Details.

## Technologies

•	React
•	TypeScript
•	Vite
•	React Router
•	React Query
•	React Context
•	React Hook Form
•	Material UI
•	Storybook
•	TMDB API

## Application Routes

·	- `/` – Landing page
·	- `/movies` – Movies
·	- `/movies/:id` – Movie details
·	- `/movies/favourites` – Favourites
·	- `/movies/upcoming` – Upcoming content
·	- `/tvshows` – TV shows
·	- `/tvshows/:id` – TV show details
·	- `/reviews/form` – Add movie review
·	- `/tvreviews/form` – Add TV show review


## Installation

Install dependencies and start the application:

```bash
npm install
npm run dev


A TMDB API key is required in the `.env` file:

```env
VITE\_TMDB\_KEY=your\_tmdb\_api\_key


## Production Build

Create a production build using:

```bash
npm run build


## Storybook

Storybook is used to develop and test reusable components independently.

```bash
npm run storybook
```


## Assignment Development

Major additions and enhancements made during the assignment include:

•	Added TV Shows as a new application entity.
•	Added TV show listing and details pages.
•	Added parameterized TV show routing.
•	Added TV show favourites.
•	Added TV show reviews.
•	Added TV show image carousel.
•	Added upcoming movies and on-air TV content.
•	Added pagination.
•	Added multi-criteria filtering and sorting.
•	Added reusable filtering functionality through a custom React hook.
•	Added React Query caching and server-state management.
•	Added persistent movie and TV favourites using localStorage.
•	Added Storybook coverage for TV show components.
•	Added a custom LULU PRIME interface and navigation.

## Author

Lovely Gregorio  
Full Stack Web Development 2
