"use server";

import { fetchZodTyped } from "@/lib/api/client";
import { BASE_URL, TMDB_API_KEY } from "@/lib/config/constants";
import { MovieDetails, MovieSummary, MovieCastMember } from "@/lib/types";
import {
  getMoviesResponseSchema,
  getSingleMovieResponseSchema,
  getMovieCastSchema,
} from "@/lib/schemas";

/**
 * Fetches a list of popular movies from the TMDB API.
 *
 * @param page - The page number to fetch.
 * @param pageSize - The number of results per page (not currently used in TMDB API).
 * @returns An object with movie results, current page, total pages, and total results.
 */
const getPopularMovies = async (page: number, pageSize: number) => {
  try {
    // Fetch popular movies
    const response = await fetchZodTyped(
      `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}&pageSize=${pageSize}`,
      {
        cache: "force-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      getMoviesResponseSchema // Validate response
    );

    // Structure the fetched data
    const allPopularMoviesData = {
      results: response.results.map((m: MovieSummary) => ({
        id: m.id,
        adult: m.adult,
        backdrop_path: m.backdrop_path,
        genre_ids: m.genre_ids,
        original_language: m.original_language,
        original_title: m.original_title,
        overview: m.overview,
        popularity: m.popularity,
        poster_path: m.poster_path,
        release_date: m.release_date,
        title: m.title,
        video: m.video,
        vote_average: m.vote_average,
        vote_count: m.vote_count,
        media_type: m.media_type,
      })),
      page: response.page,
      totalPages: response.total_pages,
      totalResults: response.total_results,
    };

    return allPopularMoviesData; // Return structured data
  } catch (error) {
    console.error("Failed to fetch all popular movies", error);
    return; // Handle error
  }
};

/**
 * Fetches a list of movies based on search keywords from the TMDB API.
 *
 * @param keywords - The search keywords for querying movies.
 * @returns An object with movie results, current page, total pages, and total results.
 */
const getSearchedMovies = async (
  page: number,
  pageSize: number,
  keywords: string
) => {
  try {
    // Fetch searched movies
    const response = await fetchZodTyped(
      `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&page=${page}&pageSize=${pageSize}&query=${encodeURIComponent(
        keywords
      )}`,
      {
        cache: "force-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      getMoviesResponseSchema // Validate response
    );

    // Structure the fetched data
    const allSearchedMoviesData = {
      results: response.results.map((m: MovieSummary) => ({
        id: m.id,
        adult: m.adult,
        backdrop_path: m.backdrop_path,
        genre_ids: m.genre_ids,
        original_language: m.original_language,
        original_title: m.original_title,
        overview: m.overview,
        popularity: m.popularity,
        poster_path: m.poster_path,
        release_date: m.release_date,
        title: m.title,
        video: m.video,
        vote_average: m.vote_average,
        vote_count: m.vote_count,
        media_type: m.media_type,
      })),
      page: response.page,
      totalPages: response.total_pages,
      totalResults: response.total_results,
    };

    return allSearchedMoviesData; // Return structured data
  } catch (error) {
    console.error("Failed to fetch searched movies", error);
    return; // Handle error
  }
};

/**
 * Fetches detailed information about a specific movie from the TMDB API.
 *
 * @param movieId - The unique identifier for the movie.
 * @returns An object containing detailed information about the movie.
 */
const getMovieDetails = async (movieId: number) => {
  try {
    // Fetch movie details

    const response = await fetchZodTyped(
      `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`,
      {
        next: { revalidate: 60 },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      getSingleMovieResponseSchema // Validate response
    );

    // Structure the fetched data
    const movieDetails: MovieDetails = {
      id: response.id,
      adult: response.adult,
      backdrop_path: response.backdrop_path,
      belongs_to_collection: response.belongs_to_collection,
      budget: response.budget,
      genres: response.genres,
      homepage: response.homepage,
      imdb_id: response.imdb_id,
      origin_country: response.origin_country,
      original_language: response.original_language,
      original_title: response.original_title,
      overview: response.overview,
      popularity: response.popularity,
      poster_path: response.poster_path,
      production_companies: response.production_companies,
      production_countries: response.production_countries,
      release_date: response.release_date,
      revenue: response.revenue,
      runtime: response.runtime,
      spoken_languages: response.spoken_languages,
      status: response.status,
      tagline: response.tagline,
      title: response.title,
      video: response.video,
      vote_average: response.vote_average,
      vote_count: response.vote_count,
    };

    return movieDetails; // Return structured data
  } catch (error) {
    console.error("Failed to fetch movie details", error);
    return; // Handle error
  }
};

/**
 * Fetches the cast information for a specific movie from the TMDB API.
 *
 * @param movieId - The unique identifier for the movie.
 * @returns An array of cast members for the movie.
 */
const getMovieCasts = async (movieId: number) => {
  try {
    // Fetch movie credits (cast and crew)
    const response = await fetchZodTyped(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`,
      {
        cache: "force-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      getMovieCastSchema // Validate response
    );

    // Structure the fetched cast data
    const movieCasts: MovieCastMember[] = response.cast.map(
      (member: MovieCastMember) => ({
        id: member.id,
        name: member.name,
        gender: member.gender,
        original_name: member.original_name,
        adult: member.adult,
        known_for_department: member.known_for_department,
        popularity: member.popularity,
        profile_path: member.profile_path,
        cast_id: member.cast_id,
        character: member.character,
        credit_id: member.credit_id,
        order: member.order,
      })
    );

    return movieCasts; // Return structured data
  } catch (error) {
    console.error("Failed to fetch movie casts", error);
    return; // Handle error
  }
};

/**
 * Fetches recommended movies based on a specific movie ID from the TMDB API.
 *
 * @param movieId - The unique identifier for the movie to get recommendations for.
 * @returns An object containing the recommended movies data.
 */
const getMovieRecommendations = async (
  movieId: number,
  page: number,
  pageSize: number
) => {
  try {
    // Fetch recommended movies
    const response = await fetchZodTyped(
      `${BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&page=${page}&pageSize=${pageSize}`,
      {
        next: { revalidate: 60 },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      getMoviesResponseSchema // Validate response
    );

    // Structure the fetched data
    const allRecommendedMoviesData = {
      results: response.results.map((m: MovieSummary) => ({
        id: m.id,
        adult: m.adult,
        backdrop_path: m.backdrop_path,
        genre_ids: m.genre_ids,
        original_language: m.original_language,
        original_title: m.original_title,
        overview: m.overview,
        popularity: m.popularity,
        poster_path: m.poster_path,
        release_date: m.release_date,
        title: m.title,
        video: m.video,
        vote_average: m.vote_average,
        vote_count: m.vote_count,
        media_type: m.media_type,
      })),
      page: response.page,
      totalPages: response.total_pages,
      totalResults: response.total_results,
    };

    return allRecommendedMoviesData; // Return structured data
  } catch (error) {
    console.error("Failed to fetch recommended movies", error);
    return; // Handle error
  }
};

export {
  getPopularMovies,
  getSearchedMovies,
  getMovieDetails,
  getMovieCasts,
  getMovieRecommendations,
};
