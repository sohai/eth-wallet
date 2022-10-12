import React, { createContext, useContext, useEffect, useState } from "react";
import { useProvider } from "./provider.context";
import { useWallet } from "./wallet.context";
import useActiveChain from "../hooks/useActiveChain";
import {
  createTransactionStore,
  TransactionStore,
} from "../utils/transactionStore";

// Only allow a single instance of the store to exist at once
// so that multiple RainbowKitProvider instances can share the same store.
// We delay the creation of the store until the first time it is used
// so that it always has access to a provider.
let storeSingleton: ReturnType<typeof createTransactionStore> | undefined;

const TransactionStoreContext = createContext<TransactionStore | null>(null);

export function TransactionStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const provider = useProvider();
  const wallet = useWallet();
  const chain = useActiveChain();
  const address = wallet.address;

  // Use existing store if it exists, or lazily create one
  const [store] = useState(
    () =>
      storeSingleton ?? (storeSingleton = createTransactionStore({ provider }))
  );

  useEffect(() => {
    store.setProvider(provider);
  }, [store, provider]);

  // Wait for pending transactions whenever address or chainId changes
  useEffect(() => {
    if (address && chain?.id) {
      store.waitForPendingTransactions(address, chain.id);
    }
  }, [store, address, chain?.id]);

  return (
    <TransactionStoreContext.Provider value={store}>
      {children}
    </TransactionStoreContext.Provider>
  );
}

export function useTransactionStore() {
  const store = useContext(TransactionStoreContext);

  if (!store) {
    throw new Error("Transaction hooks must be used within RainbowKitProvider");
  }

  return store;
}
