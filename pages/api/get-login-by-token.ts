import type { NextApiRequest, NextApiResponse } from "next";

import { Account, accounts } from "./create-account";

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
      const registeredAccount: Account | undefined = accounts.find(
        (current) => current.token === token
      );
      if (!registeredAccount) res.status(400).send("conta inválida.");
      else {
        const { name, tickets, premiumAccount } = registeredAccount;
        res.status(200).json({ name, tickets, premiumAccount });
      }
    }
  } else {
    res.status(404).send("not found");
  }
}
