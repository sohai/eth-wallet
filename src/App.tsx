import { Box, Option, Select } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import { Wallet } from "ethers";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Account from "./components/Account";
import Paper from "./components/Paper";
import PrivateKeyForm from "./components/PrivateKeyForm";
import TokenList from "./components/TokenList";
import { ProviderProvider } from "./context/provider.context";
import { WalletProvider } from "./context/wallet.context";
import { chains, getProvider } from "./providers";
import { Provider } from "./types";
import theme from "./styles/theme";

import "./styles/index.css";

function App() {
  const [wallet, setWallet] = useState<Wallet | null>();
  const [selectedChainId, setSelectedChainId] = useLocalStorage<number>(
    "eth-wallet-chain-id",
    chains[0].id
  );

  const [provider, setProvider] = useState<Provider>(
    getProvider({ chainId: selectedChainId })
  );

  const handleChainChange = (newChainId: number) => {
    setProvider(getProvider({ chainId: newChainId }));
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
            <>
              <Account />
              <TokenList />
            </>
          </WalletProvider>
        </ProviderProvider>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
