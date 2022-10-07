import { Wallet } from "ethers";
import React from "react";

const WalletContext = React.createContext<Wallet | null>(null);

function WalletProvider({
  wallet,
  children,
}: {
  wallet: Wallet | null;
  children: React.ReactNode;
}) {
  return (
    <WalletContext.Provider value={wallet}>
      {wallet && children}
    </WalletContext.Provider>
  );
}

function useWallet() {
  const context = React.useContext(WalletContext) as Wallet;
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

export { WalletProvider, useWallet };
