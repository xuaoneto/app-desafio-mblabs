import type { NextApiRequest, NextApiResponse } from "next";

import { Account, accounts } from "./create-account";

type Data = string;

interface AccountReq {
  pass: string;
  login: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { login, pass }: AccountReq = req.body;

    if (!login || !pass) res.status(400).send("conta inválida.");
    else {
      const registeredAccount: Account | undefined = accounts.find(
        (current) => current.login === login && current.password === pass
      );
      if (!registeredAccount) res.status(400).send("conta inválida.");
      else {
        res.status(200).send(registeredAccount.token);
      }
    }
  } else {
    res.status(404).send("not found");
  }
}
