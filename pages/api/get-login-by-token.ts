import type { NextApiRequest, NextApiResponse } from "next";

import { Account, accounts } from "./create-account";

type Data = Account | string;

interface AccountReq {
  token: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { token }: AccountReq = req.body;

  if (!token) res.status(400).send("conta inválida.");
  else {
    const registeredAccount: Account | undefined = accounts.find(
      (current) => current.token === token
    );
    if (!registeredAccount) res.status(400).send("conta inválida.");
    else {
      res.status(200).json(registeredAccount);
    }
  }
}
