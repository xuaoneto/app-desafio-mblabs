import { GridEvents } from "components/home-page/grid-events";
import { Navbar } from "components/navbar";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { supabaseClient } from "services/db/supabase";
import { Event } from "types";

const Home: NextPage<{ events: Event[] }> = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function getEvents() {
      const { data, error } = await supabaseClient.from("events").select();
      setEvents(data ?? []);
    }
    getEvents();
  }, []);

  return (
    <>
      <NextSeo title="Eventos" />
      <Navbar />
      <GridEvents events={events} />
    </>
  );
};

export default Home;
