import {
  useEthers,
  useLookupAddress,
} from '@usedapp/core';
import { JsonRpcProvider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { useState } from 'react';

type InternalState = {
  loading: boolean;
  error?: string | null;
};

const initialState = {
  loading: false,
  error: null,
};

export type WalletConnectState = {
  loading: boolean;
  active: boolean;
  account: string | null;
  ensAddress: string | null;
  library: JsonRpcProvider | undefined;
  error: string | null,
  activateProvider: () => void,
  deactivate: () => void,
  activateBrowserWallet: () => void,
}

export const useWalletConnect = () => {
  const [internalState, setInternalState] =
    useState<InternalState>(initialState);

  const ens = useLookupAddress();

  const {
    isLoading,
    active,
    account,
    library,
    error,
    activate,
    deactivate,
    activateBrowserWallet,
  } = useEthers();

  const getWeb3Modal = () => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: 'https://bridge.walletconnect.org',
          //infuraId: process.env.REACT_PUBLIC_INFURA_ID,
        },
      },
    };
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      disableInjectedProvider: false,
      providerOptions,
    });

    return web3Modal;
  };

  const activateProvider = async () => {
    setInternalState({
      ...internalState,
      loading: true,
    });

    const web3Modal = getWeb3Modal();

    try {
      const provider = await web3Modal.connect();
      await activate(provider);
      setInternalState({
        ...internalState,
        error: null,
        loading: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setInternalState({
        ...internalState,
        error: error,
        loading: false,
      });
    }
  };

  const handleDeactivate = () => {
    deactivate();
    getWeb3Modal().clearCachedProvider();
  };

  return {
    loading: internalState.loading || isLoading,
    active,
    account: account || null,
    ensAddress: ens || null,
    library,
    error: internalState.error || error?.toString() || null,
    activateProvider,
    deactivate: handleDeactivate,
    activateBrowserWallet,
  };
};
