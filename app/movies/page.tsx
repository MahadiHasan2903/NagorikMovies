"use client";

import React, { useEffect, useState } from "react";
import { getPopularMovies, getSearchedMovies } from "@/lib/api";
import { MovieSummary } from "@/lib/types";
import MovieCard from "@/lib/components/MovieCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  searchMovieKeywordSchema,
  SearchMovieKeywordType,
} from "@/lib/schemas";
import Loader from "@/lib/components/Loader";

const MoviesListPage = () => {
  const [movies, setMovies] = useState<MovieSummary[]>([]); // Stores the list of movies
  const [page, setPage] = useState(1); // Page number for pagination
  const [isFetching, setIsFetching] = useState(false); // Tracks loading state for infinite scroll
  const [searchKeyword, setSearchKeyword] = useState(""); // Tracks the current search term

  // Initializing useForm for form handling with Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchMovieKeywordType>({
    resolver: zodResolver(searchMovieKeywordSchema),
    defaultValues: { keywords: "" },
  });

  // Function to fetch movies based on search keyword or page number
  const fetchMovies = async (reset: boolean = false) => {
    try {
      setIsFetching(true); // Begin fetching
      const data = searchKeyword.trim() // Checks if searchKeyword is not empty
        ? await getSearchedMovies(page, 20, searchKeyword)
        : await getPopularMovies(page, 20);

      if (data?.results) {
        setMovies((prevMovies) =>
          reset ? data.results : [...prevMovies, ...data.results]
        ); // Reset or append results to the movie list
        setPage((prevPage) => prevPage + 1); // Increment page for pagination
      } else {
        console.warn("No more results found.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsFetching(false); // End fetching
    }
  };

  // Handles infinite scrolling to fetch more movies when near the page bottom
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isFetching
    ) {
      fetchMovies();
    }
  };

  // Effect to fetch movies on initial load or when searchKeyword changes
  useEffect(() => {
    fetchMovies(true); // Initial fetch or reset on new search
    window.addEventListener("scroll", handleScroll); // Set up scroll listener

    // Clean up scroll listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchKeyword]);

  // Form submit handler to initiate a new search
  const onSubmit: SubmitHandler<SearchMovieKeywordType> = (data) => {
    setSearchKeyword(data.keywords); // Update search term state
    setPage(1); // Reset to the first page for the new search
  };

  return (
    <div className="flex flex-col justify-center mt-10 w-full lg:w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">
          {!searchKeyword ? "Popular" : "Searched"} Movies
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 flex items-start gap-x-3"
        >
          <div className="w-full">
            <Controller
              name="keywords"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Search movies..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
                />
              )}
            />
            {errors.keywords && (
              <p className="text-red-500 text-sm mt-1">
                {errors.keywords.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </form>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 mx-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-0">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full mt-52 flex items-center justify-center">
          <p className="text-4xl font-bold">No movies found</p>
        </div>
      )}
      {isFetching && <Loader />}
    </div>
  );
};

export default MoviesListPage;
