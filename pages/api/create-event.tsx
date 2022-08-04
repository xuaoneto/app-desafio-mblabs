import type { NextApiRequest, NextApiResponse } from "next";
import { events } from "services/db/events";
import { getLoginByToken } from "services/get-login-by-token";

type Data = string;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const {
      id,
      title,
      date,
      description,
      image,
      tickets,
      price,
      created_by,
      userToken,
    } = req.body;
    if (!id || !title || !date || !description || !image || !tickets) {
      res.status(400).send("Preencha todos os campos para criar um evento.");
    }
    const account = getLoginByToken(userToken);
    if (account?.premium_account) {
      events.push({
        id,
        title,
        date,
        description,
        image,
        tickets,
        price,
        created_by,
      });
      res.status(200).json("Evento Criado com sucesso!");
    } else {
      res
        .status(400)
        .send("Conta inválida ou sem permissão para criar eventos.");
    }
  } else {
    res.status(404).send("not found");
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4.5mb",
    },
  },
};
