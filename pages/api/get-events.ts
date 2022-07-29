import type { NextApiRequest, NextApiResponse } from "next";
import { events } from "services/db/events";

export interface Event {
  id: string;
  title: string;
  data: string;
  description: string;
  image: string;
  tickets: number;
}

type Data = Event[] | string;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json(events);
  } else {
    res.status(404).end("not found");
  }
}
