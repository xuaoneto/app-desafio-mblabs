import { Account } from "../../pages/api/create-account";
import { generateToken } from "./generatetoken";

export function validToken(accounts: Account[]): string {
  const currentToken = generateToken();
  const isValid =
    accounts.find((current) => current.token === currentToken) === undefined;
  if (isValid) return currentToken;
  else return validToken(accounts);
}
