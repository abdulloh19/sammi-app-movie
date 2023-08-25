import Head from "next/head";
import { Header, Hero, Modal, Row, SubscriptionPlan } from "@/components";
import { GetServerSideProps } from "next";
import { API_REQUEST } from "@/services/api.service";
import { IMovie, Product } from "@/interfaces/app.interface";
import { AuthContext } from "@/Context/auth.context";
import { useContext } from "react";
import { UseInfoStore } from "src/store";

export default function Home({
  trending,
  topRated,
  tvTopRated,
  popular,
  documentary,
  fantasy,
  comedy,
  history,
  products,
  subscription,
}: HomeProps): JSX.Element {
  const { modal } = UseInfoStore();
  const { isLoading } = useContext(AuthContext);

  if (isLoading) return <>{null}</>;

  if (!subscription.length) return <SubscriptionPlan products={products} />;

  return (
    <div
      className={`relative min-h-screen ${
        modal && "!h-screen overflow-hidden"
      }`}
    >
      <Head>
        <title>Home - Sammi</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Hero trending={trending} />
        <section>
          <Row title="Top-rated" movies={topRated} />

          <Row title="Tv Show" movies={tvTopRated} isBig={false} />

          <Row title="Popular" movies={popular} />
          <Row title="documentary" movies={documentary.reverse()} />
          <Row title="fantasy" movies={fantasy} />
          <Row title="comedy" movies={comedy.reverse()} />
          <Row title="history" movies={history} />
        </section>
      </main>
      {modal && <Modal />}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req }) => {
  const user_id = req.cookies.user_id;
  const [
    trending,
    topRated,
    tvTopRated,
    popular,
    documentary,
    comedy,
    fantasy,
    history,
    products,
    subscription,
  ] = await Promise.all([
    fetch(API_REQUEST.trending).then((res) => res.json()),
    fetch(API_REQUEST.top_rated).then((res) => res.json()),
    fetch(API_REQUEST.tv_top_rated).then((res) => res.json()),
    fetch(API_REQUEST.popular).then((res) => res.json()),
    fetch(API_REQUEST.documentary).then((res) => res.json()),
    fetch(API_REQUEST.comedy).then((res) => res.json()),
    fetch(API_REQUEST.fantasy).then((res) => res.json()),
    fetch(API_REQUEST.history).then((res) => res.json()),
    fetch(API_REQUEST.product_list).then((res) => res.json()),
    fetch(`${API_REQUEST.subscription}/${user_id}`).then((res) => res.json()),
  ]);

  return {
    props: {
      trending: trending.results,
      topRated: topRated.results,
      tvTopRated: tvTopRated.results,
      popular: popular.results,
      documentary: documentary.results,
      comedy: comedy.results,
      fantasy: fantasy.results,
      history: history.results,
      products: products.products.data,
      subscription: subscription.subscription.data,
    },
  };
};

interface HomeProps {
  trending: IMovie[];
  topRated: IMovie[];
  tvTopRated: IMovie[];
  popular: IMovie[];
  documentary: IMovie[];
  comedy: IMovie[];
  fantasy: IMovie[];
  history: IMovie[];
  products: Product[];
  subscription: string[];
}
