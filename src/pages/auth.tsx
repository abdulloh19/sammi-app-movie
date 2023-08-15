import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const auth = () => {
  const [auth, setAuth] = useState<"signup" | "signin">("signin");

  const toggleAuth = (state: "signup" | "signin") => {
    setAuth(state);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center bg-black md:bg-transparent">
      <Head>
        <title>Auth</title>
        <meta
          name="description"
          content="For watchin movies you should sign to app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src={"https://rb.gy/p2hphi"}
        alt="bg"
        fill
        className="object-cover -z-10 !hidden sm:!inline opacity-60"
      />

      <Image
        src={"/logo.svg"}
        alt={"logo"}
        width={70}
        height={70}
        className="absolute top-4 left-4 object-contain cursor-pointer"
      />
      <form className="relative space-y-8 mt-24 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
        <h1 className="text-2xl font-semibold">
          {auth === "signup" ? "Sign Up" : "Sign In"}
        </h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input type="text" placeholder="Email" className="input" />
          </label>
          <label className="inline-block w-full">
            <input type="Password" placeholder="Password" className="input" />
          </label>
        </div>
        {auth === "signin" ? (
          <button
            type="submit"
            className="w-full font-semibold bg-[#E10856] py-3"
          >
            Sign In
          </button>
        ) : (
          <button
            type="submit"
            className="w-full font-semibold bg-[#E10856] py-3"
          >
            Sign Up
          </button>
        )}
        {auth === "signin" ? (
          <div className="text-[gray]">
            Not yet Account?
            <button
              type="button"
              onClick={() => toggleAuth("signup")}
              className="text-white hover:underline px-2"
            >
              Sign Up Now
            </button>
          </div>
        ) : (
          <div className="text-[gray]">
            Allready have account:
            <button
              type="button"
              onClick={() => toggleAuth("signin")}
              className="text-white hover:underline px-2"
            >
              Sign In
            </button>
          </div>
        )}{" "}
      </form>
    </div>
  );
};

export default auth;
