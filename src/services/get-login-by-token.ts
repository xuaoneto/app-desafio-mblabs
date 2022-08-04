import { Account, accounts } from "../../pages/api/create-account";

export function getLoginByToken(token: string): Partial<Account> | undefined {
  const registeredAccount: Account | undefined = accounts.find(
    (current) => current.token === token
  );
  if (!registeredAccount) return;
  else {
    const { name, tickets, premium_account, login } = registeredAccount;
    return { name, tickets, premium_account, login };
  }
}
