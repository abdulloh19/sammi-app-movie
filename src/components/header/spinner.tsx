import Image from "next/image";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center text-white bg-white/30 items-center mt-64">
      <Image
        className="animate-spin"
        src={"/spin.svg"}
        width={100}
        height={100}
        alt="spinner"
      />
    </div>
  );
};

export default Spinner;
