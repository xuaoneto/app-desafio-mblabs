// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { validToken } from "services/is-valid-token";

type Data = string;

export interface Account {
  name: string;
  pass: string;
  login: string;
  premiumAccount: boolean;
  token: string;
  tickets?: { id: string }[];
}
interface AccountReq {
  name: string;
  pass: string;
  login: string;
  premiumAccount: boolean;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    let { login, pass, name, premiumAccount }: AccountReq = req.body;

    if (!login || !pass || !name) res.status(400).send("conta inválida.");
    else {
      const isRepeated =
        accounts.find((current) => current.login === login) !== undefined;
      if (isRepeated)
        return res.status(400).send("já existe uma conta com este login");
      else {
        let token = validToken(accounts);

        accounts.push({
          login,
          pass,
          name,
          premiumAccount,
          token,
        });
        res.status(200).send("conta criada com sucesso");
      }
    }
  } else {
    res.status(404).send("not found");
  }
}

// Create a server variable
export let accounts: Account[] = [
  {
    login: "test",
    pass: "test",
    name: "Joao Neto",
    premiumAccount: true,
    token: "qiKqB7AqC2GCnK1hfGZO",
  },
];
