import type { NextApiRequest, NextApiResponse } from "next";
import { events } from "services/db/events";

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  tickets: number;
  price: number;
}

type Data = string;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { id, title, date, description, image, tickets, price } = req.body;
    if (!id || !title || !date || !description || !image || !tickets) {
      res.status(400).send("Preencha todos os campos para criar um evento.");
    }
    events.push({ id, title, date, description, image, tickets, price });
    res.status(200).json("Evento Criado com sucesso!");
  } else {
    res.status(404).send("not found");
  }
}
