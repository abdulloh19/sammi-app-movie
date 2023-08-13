import { useRef, useState } from "react";
import Thumbnail from "../thumbnail/thumbnail";
import { RowProps } from "./row.props";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";

const Row = ({ title, movies }: RowProps) => {
  const [moved, setMoved] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: "left" | "right") => {
    setMoved(true);

    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;

      console.log(clientWidth);

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-[600px] space-y-1 md:space-y-2">
      <h1 className="w-56 cursor-pointer text-sm md:text-2xl font-semibold text-[#e5e5e5] hover:text-white transition duration-200">
        {title}
      </h1>
      {/* Coursel */}
      <div className="group relative md:ml-2">
        <BsChevronDoubleLeft
          onClick={() => handleClick("left")}
          className={`top-0 left-2 bottom-0 absolute z-40 m-auto h-6 w-6 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-100 ${
            !moved && "hidden"
          }`}
        />
        {/* thumbnail */}
        <div
          ref={carouselRef}
          className="flex items-center scrollbar-hide space-x-4 overflow-x-scroll md:space-x-6`"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <BsChevronDoubleRight
          onClick={() => handleClick("right")}
          className="top-0 right-2 bottom-0 absolute z-40 m-auto h-6 w-6 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-100"
        />
      </div>
    </div>
  );
};

export default Row;
