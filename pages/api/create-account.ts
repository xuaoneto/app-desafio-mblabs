// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { validToken } from "services/is-valid-token";

type Data = string;

export interface Account {
  name: string;
  password: string;
  login: string;
  premium_account: boolean;
  token: string;
  tickets?: number[];
}
interface AccountReq {
  name: string;
  password: string;
  login: string;
  premium_account: boolean;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    let { login, password, name, premium_account }: AccountReq = req.body;

    if (!login || !password || !name) res.status(400).send("conta inválida.");
    else {
      const isRepeated =
        accounts.find((current) => current.login === login) !== undefined;
      if (isRepeated)
        return res.status(400).send("já existe uma conta com este login");
      else {
        let token = validToken(accounts);

        accounts.push({
          login,
          password,
          name,
          premium_account,
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
    password: "test",
    name: "Joao Neto",
    premium_account: true,
    token: "qiKqB7AqC2GCnK1hfGZO",
  },
];
