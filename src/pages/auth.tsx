import { TextField } from "@/components";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/hooks/useAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GetServerSideProps } from "next";

const auth = () => {
  const [auth, setAuth] = useState<"signup" | "signin">("signin");
  const { signIn, signUp, user, error, isLoading, setIsLoading } = useAuth();

  const toggleAuth = (state: "signup" | "signin") => {
    setAuth(state);
  };

  const onsubmit = async (formData: { email: string; password: string }) => {
    if (auth === "signup") {
      signUp(formData.email, formData.password);
    } else {
      signIn(formData.email, formData.password);
    }
  };

  const validation = Yup.object({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is requarid"),
    password: Yup.string()
      .min(4, "4 minimum character")
      .required("Password is requarid"),
  });

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
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onsubmit}
        validationSchema={validation}
      >
        <Form className="relative space-y-10 mt-24 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-10">
          <h1 className="text-2xl font-semibold">
            {auth === "signup" ? "Sign Up" : "Sign In"}
          </h1>
          {error && (
            <p className="text-red-500 font-semibold text-center">{error}</p>
          )}
          <div className="space-y-2">
            <TextField name="email" placeholder="Email" type="text" />
            <TextField name="password" placeholder="Password" type="password" />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-semibold rounded hover:bg-[#f4357b] bg-[#E10856] py-3 mt-3"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <AiOutlineLoading3Quarters className="mx-2 transition-all animate-spin" />{" "}
                Loading...
              </div>
            ) : auth === "signin" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
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
        </Form>
      </Formik>

      {/* </div> */}
    </div>
  );
};

export default auth;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user_id = req.cookies.user_id;
  if (user_id) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  return {
    props: {},
  };
};
