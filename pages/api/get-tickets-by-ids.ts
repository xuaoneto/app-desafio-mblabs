import type { NextApiRequest, NextApiResponse } from "next";
import { events } from "services/db/events";
import { Event } from "./get-events";

type Data = Event[] | string;

type TicketsId =
  | {
      id: string;
    }[]
  | undefined;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const ticketsId: TicketsId = req.body;

    if (!ticketsId) res.status(400).send("Mandar array de ids.");
    else {
      const filteredTickets = events.filter(
        (event) => ticketsId.find(({ id }) => event.id === id) !== undefined
      );

      res.status(200).json(filteredTickets);
    }
  } else {
    res.status(404).send("not found");
  }
}
