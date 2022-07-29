import { Apresentation } from "components/home-page/apresentation";
import { GridEvents } from "components/home-page/grid-events";
import { Navbar } from "components/navbar";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Apresentation />
      <GridEvents />
    </>
  );
};

export default Home;
