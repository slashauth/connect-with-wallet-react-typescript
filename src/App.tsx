import './App.css';
import { DAppProvider } from '@usedapp/core';
import WalletAuthProvider from './providers/wallet-connect-provider';
import Home from './Home';

const dappConfig = {
  notifications: {
    checkInterval: 500,
    expirationPeriod: 5000,
  },
  autoConnect: false,
};

function App() {
  return (
    <DAppProvider config={dappConfig}>
      <WalletAuthProvider>
        <Home />
      </WalletAuthProvider>
    </DAppProvider>
  );
}

export default App;
