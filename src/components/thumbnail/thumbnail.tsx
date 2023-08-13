import Image from "next/image";
import { ThumbnailProps } from "./thumbnail.props";
import { image_url } from "@/helper/helper";

const Thumbnail = ({ movie }: ThumbnailProps) => {
  return (
    <div className="relative h-[330px] md:h-[440px] min-w-[200px] md:min-w-[292px] cursor-pointer transition duration-200 ease-out md:hover:scale-110">
      <Image
        src={`${image_url}${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie.title}
        className="rounded-sm md:rounded object-cover"
        fill
      />
    </div>
  );
};

export default Thumbnail;
