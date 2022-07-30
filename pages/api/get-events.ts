import type { NextApiRequest, NextApiResponse } from "next";
import { events } from "services/db/events";

export interface Event {
  id: string;
  title: string;
  data: string;
  description: string;
  image: string;
  tickets: number;
  price: number;
}

type Data = Event[] | string;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    if (req.query.id) {
      const filteredEvents = events.filter(
        (current) => current.id === req.query.id
      );
      res.status(200).json(filteredEvents);
    } else res.status(200).json(events);
  } else {
    res.status(404).send("not found");
  }
}
