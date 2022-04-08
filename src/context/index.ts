import { createContext } from "react";
import { WalletConnectState } from "../hooks/use-wallet-connect";
import { AuthState } from "../hooks/use-wallet-login";

export const WalletLoginContext = createContext<AuthState>({
  connectedAddress: null,
  ensAddress: null,
  loading: false,
  isLoggedIn: false,
  loggingIn: false,
  ethersActive: false,
  activateProvider: async () => {},
  login: async () => null,
  logout: async () => {},
});

export const WalletConnectContext = createContext<WalletConnectState>({
  loading: false,
  active: false,
  account: null,
  ensAddress: null,
  library: undefined,
  error: null,
  activateProvider: () => {},
  deactivate: () => {},
  activateBrowserWallet: () => {},
})