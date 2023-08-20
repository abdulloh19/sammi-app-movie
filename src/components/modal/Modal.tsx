import { Element } from "@/interfaces/app.interface";
import { UseInfoStore } from "@/store";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { BsFillVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import ReactPlayer from "react-player";

const Modal = () => {
  const [trailer, setTrailer] = useState<string>("");
  const { modal, setModal, CurrentMovie } = UseInfoStore();
  const [muted, setMuted] = useState<boolean>(true);
  const [like, setLike] = useState<boolean>(false);

  const base_url: string = process.env.NEXT_PUBLIC_API_DOMAIN as string;
  const api_key: string = process.env.NEXT_PUBLIC_API_KEY as string;

  const api = `${base_url}/${
    CurrentMovie?.media_type === "tv" ? "tv" : "movie"
  }/${CurrentMovie.id}/videos?api_key=${api_key}&language=en-US`;

  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await fetch(api).then((res) => res.json());

      console.log(data);

      if (data?.results) {
        const index = data.results.findIndex(
          (el: Element) => el.type === "Trailer"
        );
        setTrailer(data?.results[index]?.key);
      }
    };

    console.log(trailer);

    fetchVideoData();
  }, [CurrentMovie]);

  return (
    <MuiModal
      open={modal}
      onClose={close}
      className="fixed !top-7 left-0 right-0 -z-50  mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
    >
      <>
        <button
          onClick={() => setModal(false)}
          className="modalButton absolute bg-black/100 z-50 w-12 h-12 top-5 right-5"
        >
          <TiTimes className="-z-50" />
        </button>
        <div className="relative pt-[55%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width={"100%"}
            height={"100%"}
            playing
            style={{ top: 0, left: 0, position: "absolute" }}
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-20">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-10 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                Play
              </button>

              <button className="modalButton">
                <BiPlus className="w-7 h-7" />
              </button>
              <button
                onClick={() => setLike((p) => !p)}
                className="modalButton"
              >
                {like ? (
                  <AiTwotoneLike className="w-7 h-7" />
                ) : (
                  <AiOutlineLike className="w-7 h-7" />
                )}
              </button>
              <button
                className="modalButton"
                onClick={() => setMuted((prev) => !prev)}
              >
                {muted ? (
                  <BsVolumeMuteFill className="w-7 h-7" />
                ) : (
                  <BsFillVolumeUpFill className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>
        .
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {CurrentMovie!.vote_average * 10}% Match
              </p>
              <p className="font-light">{CurrentMovie?.release_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{CurrentMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {CurrentMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {CurrentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
