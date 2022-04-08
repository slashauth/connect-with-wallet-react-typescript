import { useCallback, useEffect, useRef, useState } from 'react';
import { getNonceToSign, TokenResponse, verifySignedMessage } from '../client';
import { useWalletConnect } from './use-wallet-connect';

export type AuthState = {
  loggingIn: boolean;
  loading: boolean;
  isLoggedIn: boolean;
  connectedAddress: string | null;
  ensAddress: string | null;
  ethersActive: boolean;
  error?: string | null;
  activateProvider: () => Promise<void>;
  login: () => Promise<boolean | null>;
  logout: () => Promise<void>;
};

type InternalState = {
  tokens: TokenResponse | null;
  loggingIn: boolean;
  error?: string;
};

const initialState = {
  loggingIn: false,
  connectedAddress: null,
  tokens: null,
};

export const useWalletLogin = (): AuthState => {
  const {
    loading,
    active,
    account,
    ensAddress,
    library,
    error,
    activateProvider,
    deactivate,
    activateBrowserWallet,
  } = useWalletConnect();

  const loggingOut = useRef(false);

  const [internalState, setInternalState] =
    useState<InternalState>(initialState);

  const internalLoggingIn = useRef(false);

  useEffect(() => {
    if (
      !active &&
      !error &&
      !loggingOut.current
    ) {
      activateProvider();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, error]);

  const logoutUser = useCallback(async () => {
    loggingOut.current = true;
    try {
      deactivate();
      setInternalState({
        ...initialState,
      });
    } finally {
      loggingOut.current = false;
    }
  }, [deactivate]);

  const signNonceAndLogin = useCallback(async (): Promise<boolean | null> => {
    if (library && account) {
      const loginNonceResponse = await getNonceToSign(account.toLowerCase());
      const signedNonce = await library
        .getSigner()
        .signMessage(loginNonceResponse);

      const verifyResp = await verifySignedMessage(account, signedNonce);
      
      setInternalState({
        ...internalState,
        tokens: verifyResp,
      });
    }
    return null;
  }, [account, internalState, library]);

  const loginUser = useCallback(async (): Promise<boolean | null> => {
    // eslint-disable-next-line no-debugger
    if (loggingOut.current) {
      return null;
    }
    if (!active) {
      await activateProvider();
    }
    if (!account) {
      activateBrowserWallet();
    }
    if (internalLoggingIn.current) {
      return null;
    }
    internalLoggingIn.current = true;
    setInternalState({
      ...internalState,
      loggingIn: true,
      error: undefined,
    });
    let success = false;
    try {
      await signNonceAndLogin();
      setInternalState({
        ...internalState,
        loggingIn: false,
      });
      success = true;
    } catch (err) {
      setInternalState({
        ...internalState,
        error: `Error logging in: ${err}`,
      });
      await logoutUser();
    } finally {
      internalLoggingIn.current = false;
    }
    return success;
  }, [
    account,
    activateBrowserWallet,
    activateProvider,
    active,
    internalState,
    logoutUser,
    signNonceAndLogin,
  ]);

  useEffect(() => {
    if (
      account &&
      !internalState.loggingIn
    ) {
      loginUser();
    }
  }, [
    account,
    internalState.loggingIn,
    loginUser,
  ]);

  return {
    ...internalState,
    loading,
    connectedAddress: account || null,
    isLoggedIn: !!internalState.tokens,
    ensAddress,
    ethersActive: active || false,
    error: error || internalState.error || null,
    activateProvider,
    login: loginUser,
    logout: logoutUser,
  };
};

export default useWalletLogin;
