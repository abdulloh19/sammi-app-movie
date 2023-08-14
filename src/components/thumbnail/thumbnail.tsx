import Image from "next/image";
import { ThumbnailProps } from "./thumbnail.props";
import { image_url } from "@/helper/helper";
import ReactStars from "react-stars";

const Thumbnail = ({ movie, isBig = false }: ThumbnailProps) => {
  return (
    <div
      className={`relative ${
        isBig
          ? "h-[450px] md:h-[600px] min-w-[350px] md:min-w-[450px]"
          : "h-[330px] md:h-[440px] min-w-[330px] md:min-w-[440px]"
      }  cursor-pointer transition duration-200 ease-out md:hover:scale-110`}
    >
      <Image
        src={`${image_url}${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie.title}
        className="rounded-sm md:rounded object-cover"
        fill
      />

      <div className="w-full h-full bg-black/40 absolute left-0 right-0 bottom-0" />

      <div className="absolute bottom-5 left-4 right-2">
        <div className="flex items-center space-x-2">
          <ReactStars
            edit={false}
            count={10}
            value={movie.vote_average}
            color2={"#fff"}
          />
          <p>({movie.vote_count})</p>
        </div>
        <h1 className="text-xl font-bold md:text-3xl lg:textxl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
      </div>
    </div>
  );
};

export default Thumbnail;
