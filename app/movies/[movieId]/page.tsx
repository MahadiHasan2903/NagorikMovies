import React, { FC } from "react";
import { getMovieDetails, getMovieCasts } from "@/lib/api";
import poster from "@/public/poster.jpeg";
import Image from "next/image";
import RecommendedMovies from "@/lib/components/RecommendedMovies";

interface MovieDetailsPageProps {
  params: {
    movieId: string;
  };
}

// Mark the component as async
const MovieDetailsPage: FC<MovieDetailsPageProps> = async ({ params }) => {
  const resolvedParams = await params;
  const movieId = Number(resolvedParams.movieId);
  const movieDetails = await getMovieDetails(movieId);
  const movieCasts = await getMovieCasts(movieId);

  return (
    <div className="mt-5 w-full lg:w-[1440px] mx-auto px-2">
      <h1 className="text-2xl w-full pb-3 mb-5 font-bold border-b border-black border-opacity-5">
        Movie Details
      </h1>
      <div className="flex flex-col lg:flex-row items-start mb-10 lg:mb-20 gap-y-3 lg:gap-y-0">
        <div className="w-full lg:w-1/3">
          <Image
            src={poster || movieDetails?.poster_path}
            alt={`${movieDetails?.title} cover`}
            width={400}
            height={600}
            className="w-[400px] !h-[350px] lg:h-[600px]"
          />
        </div>
        <div className="flex flex-col gap-y-3 w-full lg:w-2/3">
          <div className="text-xl font-bold">
            Title: <span>{movieDetails?.title}</span>
          </div>
          <p className="text-lg">{movieDetails?.overview}</p>
          <div>
            <span className="text-lg font-medium mr-2">Genres:</span>{" "}
            {movieDetails?.genres.map((genre) => genre.name).join(", ")}
          </div>

          <div>
            <span className="text-lg font-medium mr-2">Release Date:</span>{" "}
            {movieDetails?.release_date}
          </div>

          <div>
            <span className="text-lg font-medium mr-2">Casts:</span>{" "}
            {movieCasts?.map((cast) => cast.name).join(", ")}
          </div>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-2xl w-full pb-3 mb-5 font-bold border-b border-black border-opacity-5">
          Recommended Movies
        </h1>
        <RecommendedMovies movieId={movieId} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
