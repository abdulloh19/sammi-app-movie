import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Success = () => {
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
        <AiOutlineCheckCircle className="w-10 h-10 md:w-14 md:h-14 text-green-500" />
        <h3 className="text-2xl md:text-5xl mt-4">Subscription Completed</h3>
        <Link href={"/"}>
          <button
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
            className="bg-green-500 py-3 px-5 mt-5 rounded text-2xl"
          >
            {isLoading ? "Loading..." : "Dashboard"}
          </button>
        </Link>
      </div>
    </>
  );
};

export default Success;
