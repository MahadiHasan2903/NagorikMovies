"use client";

import React, { useEffect, useState } from "react";
import { getMovieRecommendations } from "@/lib/api";
import { MovieSummary } from "@/lib/types";
import MovieCard from "@/lib/components/MovieCard";
import Loader from "@/lib/components/Loader";

const RecommendedMovies = ({ movieId }: { movieId: number }) => {
  // State to store the list of recommended movies
  const [movies, setMovies] = useState<MovieSummary[]>([]);

  // State to manage the current page for pagination
  const [page, setPage] = useState(1);

  // State to track the loading state for fetching movies
  const [isFetching, setIsFetching] = useState(false);

  // Function to fetch movie recommendations based on the current page
  const fetchMovies = async (reset: boolean = false) => {
    // Prevent multiple simultaneous fetches
    if (isFetching) return;
    setIsFetching(true); // Set fetching state to true

    try {
      // Fetch movie recommendations from the API
      const data = await getMovieRecommendations(movieId, page, 20);

      if (data?.results) {
        // Update the movie list, either replacing or appending based on reset flag
        setMovies((prevMovies) =>
          reset ? data.results : [...prevMovies, ...data.results]
        );
        // Increment the page number only if not resetting the movie list
        if (!reset) setPage((prevPage) => prevPage + 1);
      } else {
        console.warn("No more results found."); // Log if no more results
      }
    } catch (error) {
      console.error("Error fetching movies:", error); // Log any fetch errors
    } finally {
      setIsFetching(false); // Reset fetching state after operation
    }
  };

  // Function to handle infinite scrolling
  const handleScroll = () => {
    // Check if user is near the bottom of the page
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      fetchMovies(); // Fetch more movies if near bottom
    }
  };

  // Effect to fetch movies on initial load and set up scroll event listener
  useEffect(() => {
    fetchMovies(true); // Initial fetch of movies
    window.addEventListener("scroll", handleScroll); // Add scroll listener

    // Clean up scroll listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col justify-center mt-600. w-full lg:w-[1440px] mx-auto">
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 mx-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-0">
          {/* Render each movie card */}
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full mt-52 flex items-center justify-center">
          <p className="text-2xl font-bold">No recommendation found</p>
        </div>
      )}
      {isFetching && <Loader />}
    </div>
  );
};

export default RecommendedMovies;
