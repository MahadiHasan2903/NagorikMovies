import { z } from "zod";

export const searchMovieKeywordSchema = z.object({
  keywords: z
    .string()
    .min(1, "Please enter keywords to search.")
    .refine(
      (value) => value.trim().length > 0,
      "Please enter keywords to search."
    ),
});

export type SearchMovieKeywordType = z.infer<typeof searchMovieKeywordSchema>;

/**
 * Schema for validating the response structure of a movie collection.
 * This includes pagination details and an array of movie objects.
 * Each movie object contains various attributes including:
 * - id: Unique identifier for the movie
 * - adult: Indicates if the movie is for adults
 * - backdrop_path: Path to the backdrop image
 * - genre_ids: Array of genre identifiers
 * - original_language: Language in which the movie was originally produced
 * - original_title: Original title of the movie
 * - overview: Brief description of the movie
 * - popularity: Popularity score of the movie
 * - poster_path: Path to the poster image
 * - release_date: Release date of the movie
 *
 */
export const getMoviesResponseSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      adult: z.boolean(),
      backdrop_path: z.string().nullable(),
      genre_ids: z.array(z.number()),
      original_language: z.string(),
      original_title: z.string(),
      overview: z.string(),
      popularity: z.number(),
      poster_path: z.string().nullable(),
      release_date: z.string(),
      title: z.string(),
      video: z.boolean(),
      vote_average: z.number(),
      vote_count: z.number(),
      media_type: z.string().optional(),
    })
  ),
});

/**
 * Schema for validating the response structure of a single movie.
 *
 */
export const getSingleMovieResponseSchema = z.object({
  id: z.number(),
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().nullable(),
      backdrop_path: z.string().nullable(),
    })
    .nullable(),
  budget: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  homepage: z.string().url().nullable(),
  imdb_id: z.string().nullable(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(
    z.object({
      id: z.number(),
      logo_path: z.string().nullable(),
      name: z.string(),
      origin_country: z.string(),
    })
  ),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    })
  ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number().nullable(),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    })
  ),
  status: z.string(),
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

/**
 * Schema for validating the response structure of a movie's cast information.
 *
 */
export const getMovieCastSchema = z.object({
  id: z.number(),
  cast: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      gender: z.number().nullable(),
      original_name: z.string(),
      adult: z.boolean(),
      known_for_department: z.string(),
      popularity: z.number(),
      profile_path: z.string().nullable(),
      cast_id: z.number(),
      character: z.string(),
      credit_id: z.string(),
      order: z.number(),
    })
  ),
});
