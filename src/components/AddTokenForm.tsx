import { Box, Button, TextField } from "@mui/joy";
import { ethers } from "ethers";
import { FormEvent, useRef, useState } from "react";
import { useProvider } from "../context/provider.context";
import { useWallet } from "../context/wallet.context";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function AddTokenForm() {
  const provider = useProvider();
  const wallet = useWallet();

  const [tokensContractsList, setTokensContractsList] = useLocalStorage<
    string[]
  >(`token-list-${wallet.address}-${provider.chainId}`, []);

  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target as HTMLFormElement);
    const contractAddress = formData.get("contractAddress") as string;
    if (!ethers.utils.isAddress(contractAddress)) {
      setError("Not an address");
      return;
    }

    const exists = tokensContractsList.some((ca) => ca === contractAddress);
    if (exists) {
      setError("Token already added");
      return;
    }
    setTokensContractsList([...tokensContractsList, contractAddress]);
    const inputElm = inputRef.current?.firstChild as HTMLInputElement;
    if (inputElm) {
      inputElm.value = "";
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{ display: "flex", alignItems: "start" }}
    >
      <TextField
        name="contractAddress"
        placeholder="Enter token contract address"
        error={Boolean(error)}
        helperText={error || " "}
        sx={{
          flex: 1,
        }}
        componentsProps={{
          input: {
            ref: inputRef,
            // @ts-ignore
            sx: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          },
        }}
      />
      <Button
        type="submit"
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          minWidth: 110,
        }}
      >
        Add token
      </Button>
    </Box>
  );
}
