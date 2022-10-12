import { Box, Option, Select } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import { Wallet } from "ethers";
import { useState } from "react";
import Account from "./components/Account";
import Paper from "./components/Paper";
import PrivateKeyForm from "./components/PrivateKeyForm";
import TokenList from "./components/TokenList";
import { ProviderProvider } from "./context/provider.context";
import { WalletProvider } from "./context/wallet.context";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { chains, getProvider } from "./providers";
import theme from "./styles/theme";
import { Provider } from "./types";
import TransactionsHistory from "./components/TransactionsHistory";
import { TransactionStoreProvider } from "./context/TransactionsStore.context";
import "./styles/index.css";

function App() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [selectedChainId, setSelectedChainId] = useLocalStorage<number>(
    "eth-wallet-chain-id",
    chains[0].id
  );

  const [provider, setProvider] = useState<Provider>(
    getProvider({ chainId: selectedChainId })
  );

  const handleChainChange = (newChainId: number) => {
    const newProvider = getProvider({ chainId: newChainId });
    setProvider(newProvider);
    setSelectedChainId(newChainId);
  };

  const isConnected = Boolean(wallet);

  return (
    <CssVarsProvider theme={theme}>
      <Box
        sx={{
          maxWidth: "900px",
          flexDirection: "column",
          justifyContent: "center",
          display: "flex",
          margin: "0 auto",
        }}
      >
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <PrivateKeyForm
            onSuccess={(wallet) => {
              setWallet(wallet);
            }}
            onError={() => {
              setWallet(null);
            }}
            connected={isConnected}
          />
          <Select
            sx={{
              marginLeft: 2,
              minWidth: "120px",
            }}
            value={selectedChainId}
            onChange={(_, newValue) => handleChainChange(newValue as number)}
          >
            {chains.map(({ id, name }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Paper>
        <ProviderProvider provider={provider}>
          <WalletProvider wallet={wallet}>
            <TransactionStoreProvider>
              <>
                <Account />
                <TokenList />
                <TransactionsHistory />
              </>
            </TransactionStoreProvider>
          </WalletProvider>
        </ProviderProvider>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
