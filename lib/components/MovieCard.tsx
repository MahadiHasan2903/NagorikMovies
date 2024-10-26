import Link from "next/link";
import React from "react";
import { MovieSummary } from "../types";
import Image from "next/image";
import poster from "@/public/poster.jpeg";

const MovieCard = ({ movie }: { movie: MovieSummary }) => {
  return (
    <div className="w-full mb-10 border border-black p-2 border-opacity-5">
      <div className="w-full flex flex-col items-center justify-center">
        <Link href={`/movies/${movie.id}`} className="w-full">
          <Image
            src={poster || movie.poster_path}
            alt={`${movie.title} cover`}
            width={800}
            height={500}
            className="object-contain w-full animate-slide-in"
          />
        </Link>

        <div className="text-center ">
          <div className="my-2 text-2xl font-semibold ">
            {movie.title.length > 30
              ? `${movie.title.slice(0, 25)}...`
              : movie.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
