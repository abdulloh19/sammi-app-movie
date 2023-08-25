import Image from "next/image";
import React, { useState } from "react";
import { BiErrorAlt } from "react-icons/bi";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Cancel = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <div className="flex justify-start py-4 px-4">
        <Image
          src={"/logo.svg"}
          alt={"logo"}
          width={56}
          height={56}
          className="object-contain cursor-pointer"
        />
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <BiErrorAlt className="w-10 h-10 md:w-14 md:h-14 text-red-500" />
        <h3 className="text-2xl md:text-5xl mt-4">Canceled Subscription</h3>
        <Link href={"/"}>
          <button
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
            className="bg-[#E10856] py-3 px-5 mt-5 rounded text-2xl"
          >
            {isLoading ? <div className="flex justify-center items-center">
                <AiOutlineLoading3Quarters className="mx-2 transition-all animate-spin" />{" "}
                Loading...
              </div> : "Choose plan"}
          </button>
        </Link>
      </div>
    </>
  );
};

export default Cancel;
