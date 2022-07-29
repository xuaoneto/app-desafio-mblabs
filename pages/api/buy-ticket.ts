import type { NextApiRequest, NextApiResponse } from "next";
import { events } from "services/db/events";
import { accounts } from "./create-account";
import { Event } from "./get-events";

type Data = Event[] | string;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { id, token } = req.body;
    const event = events.findIndex((current) => current.id === id);
    const buyer = accounts.findIndex((current) => current.token === token);
    if (event !== -1 && buyer !== -1) {
      events[event].tickets -= 1;
      const eventId = events[event].id;
      if (accounts[buyer].tickets)
        accounts[buyer].tickets!.push({ id: eventId });
      else accounts[buyer].tickets = [{ id: eventId }];

      res.status(200).send("Compra realizada com sucesso");
    }
  } else {
    res.status(404).end("not found");
  }
}
