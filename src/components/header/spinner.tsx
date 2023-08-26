import Image from "next/image";
import React from "react";
import { BiLoader } from "react-icons/bi";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center mt-64">
      {/* <Image
        className="animate-spin text-white"
        src={"/spin.svg"}
        width={100}
        height={100}
        alt="spinner"
      /> */}
      <BiLoader className="w-20 h-20 animate-spin" />
    </div>
  );
};

export default Spinner;
