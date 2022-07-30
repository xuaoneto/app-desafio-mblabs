import { api } from "api";
import { Apresentation } from "components/home-page/apresentation";
import { GridEvents } from "components/home-page/grid-events";
import { Navbar } from "components/navbar";

import type { NextPage } from "next";
import { useState } from "react";
import { Event } from "./api/get-events";

const Home: NextPage<{ events: Event[] }> = ({ events }) => {
  const [visibleEvents, setVisibleEvents] = useState(events);

  return (
    <>
      <Navbar />
      <Apresentation />
      <GridEvents events={visibleEvents} />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const response = await api.get("api/get-events");
  const events = response.data;

  return {
    props: { events },
    revalidate: 10,
  };
}
