import { api } from "api";
import { GridEvents } from "components/home-page/grid-events";
import { Navbar } from "components/navbar";

import type { NextPage } from "next";
import { Event } from "./api/get-events";

const Home: NextPage<{ events: Event[] }> = ({ events }) => {
  return (
    <>
      <Navbar />
      <GridEvents events={events} />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const response = await api.get("api/get-events");
  const events = response.data;

  return {
    props: { events },
  };
}
