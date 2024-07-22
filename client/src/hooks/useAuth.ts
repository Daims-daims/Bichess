import { Account } from "./types.ts";
import  useAccountStore  from "./useAccountStore.ts";
import { useCallback } from "react";
import apiFetch  from "../lib/api.ts";

export function useAuth() {
  const { account, setAccount } = useAccountStore();
  let status :  "unknown" | "authenticated" | "guest"
  switch (account) {
    case null:
      status = "guest";
      break;
    case undefined:
      status = "unknown";
      break;
    default:
      status = account.status;
      break;
  }

  const authenticate = useCallback(() => {
    apiFetch<Account>("/me","GET")
      .then(setAccount)
      .catch(() => setAccount(null));
  }, []);

  const login = useCallback((pseudo: string, password: string) => {
    apiFetch<Account>("/login","POST", { pseudo, password }).then(
      setAccount
    );
  }, []);

  const logout = useCallback(() => {
    apiFetch<Account>("/logout","DELETE").then(setAccount);
  }, []);

  return {
    status,
    authenticate,
    login,
    logout,
  };
}