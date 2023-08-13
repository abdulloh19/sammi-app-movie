import Image from "next/image";
import { IMovie } from "@/interfaces/app.interface";
import { HeroProps } from "./hero.props";
import { useEffect, useState } from "react";
import { image_url } from "@/helper/helper";
import { TbPlayerPlay } from "react-icons/tb";
import ReactStars from "react-stars";

const Hero = ({ trending }: HeroProps): JSX.Element => {
  const [movie, setMovie] = useState<IMovie>({} as IMovie);

  useEffect(() => {
    const randomMovie = trending[Math.floor(Math.random() * trending.length)];
    setMovie(randomMovie);
  }, [trending]);

  return (
    <div className="flex flex-col space-y-2 py-20 md:space-y-4 lg:h-[65vh] lg:pb-12 lg:justify-end">
      <div className="absolute top-0 -z-10 left-0 h-[95vh] w-full">
        <Image
          src={`${image_url}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie.title}
          className="object-cover"
          fill
        />
      </div>

      <div className="py-[8px] px-[8px] text-center rounded-bl-[8px] rounded-tr-[8px] bg-[#e5e5e5]/40 w-[111px]">
        {movie.media_type}
      </div>

      <div className="flex items-center space-x-2">
        <ReactStars
          edit={false}
          count={10}
          value={movie.vote_average}
          color2={"#fff"}
        />
        <p>({movie.vote_count})</p>
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs md:max-w-lg lg:max-w-2xl text-shadow-lg text-xs md:text-lg  lg:text-2xl">
        {movie?.overview?.slice(0, 100)}...
      </p>
      <div>
        <button className="bg-white/60 flex justify-center items-center font-bold text-black w-[200px] h-[56px] rounded-full">
          <TbPlayerPlay className="h-5 w-5 md:h8 md:w-8" />
          Watch now
        </button>
      </div>
    </div>
  );
};

export default Hero;
