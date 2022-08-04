import type { NextApiRequest, NextApiResponse } from "next";
import { getLoginByToken } from "services/get-login-by-token";

import { Account } from "./create-account";

type Data = Partial<Account> | string;

interface AccountReq {
  token: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { token }: AccountReq = req.body;

    if (!token) res.status(400).send("conta inválida.");
    else {
      const account = getLoginByToken(token);
      if (account) res.status(200).json(account);
      else res.status(400).send("conta inválida.");
    }
  } else {
    res.status(404).send("not found");
  }
}
