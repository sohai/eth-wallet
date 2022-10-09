import React from "react";
import { Provider } from "../types";

const ProviderContext = React.createContext<Provider | null>(null);

function ProviderProvider({
  provider,
  children,
}: {
  provider: Provider | null;
  children: React.ReactNode;
}) {
  return (
    <ProviderContext.Provider value={provider}>
      {children}
    </ProviderContext.Provider>
  );
}

function useProvider() {
  const context = React.useContext(ProviderContext) as Provider;
  if (!context) {
    throw new Error("useProvider must be used within a ProviderContext");
  }
  return context;
}

export { ProviderProvider, useProvider };
