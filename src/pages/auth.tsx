import Head from "next/head";

const auth = () => {
  return (
    <>
      <Head>
        <title>Auth</title>
        <meta
          name="description"
          content="For watchin movies you should sign to app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Auth</div>
    </>
  );
};

export default auth;
