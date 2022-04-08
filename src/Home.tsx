import React, { useContext, useEffect, useMemo } from 'react';
import BeatLoader from './components/beat-loader';
import { PrimaryButton } from './components/Buttons';
import { WalletConnectContext } from './context';

const Home = () => {
  const {
    account,
    active,
    activateProvider,
    activateBrowserWallet,
    error,
    loading,
    deactivate,
  } = useContext(WalletConnectContext);

  useEffect(() => {
    if (!active && !error) {
      activateProvider();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const contents = useMemo(() => {
    if (account) {
      return <div className="flex flex-col items-center justify-center w-full">
        <p>Connected with account {account}</p>
        <PrimaryButton onClick={deactivate}>Disconnect Wallet</PrimaryButton>
      </div>
    }
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-xl font-bold text-purple-700 my-4">
            Please open metamask to connect your wallet
          </p>
          <BeatLoader />
        </div>
      );
    }

    const activate = async () => {
      await activateBrowserWallet();
    };

    return (
      <div className="flex flex-col items-center justify-center w-full">
        <PrimaryButton onClick={activate}>Login With Wallet</PrimaryButton>
        <p>NOTE: If you want to experience a first time user experience, open metamask and disconnect your wallet(s) from localhost:3000</p>
      </div>
    );
  }, [account, loading, deactivate, activateBrowserWallet]);

  return <div className="min-h-screen flex items-center justify-start w-full">{contents}</div>;
};

export default Home;