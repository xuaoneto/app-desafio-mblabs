import { Apresentation } from "components/home-page/apresentation";
import { Navbar } from "components/navbar";

import type { NextPage } from "next";

const MyTickets: NextPage = () => {
  return (
    <>
      <Navbar />
      <Apresentation />
    </>
  );
};

export default MyTickets;
