import { createRef, FormEvent, useRef, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Button, Sheet, TextField } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { useWallet, WalletProvider } from "./context/wallet.context";
import { verifyPrivateKey } from "./utils";
import { ethers, Wallet } from "ethers";

function Test() {
  const wallet = useWallet();

  return <div>{wallet.address}</div>;
}

function App() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setWallet(null);

    const formData = new FormData(event.target as HTMLFormElement);
    const value = formData.get("key") as string;
    if (!value) {
      // In case we disconnecting, reset input value
      if (inputRef.current?.firstChild) {
        (inputRef.current.firstChild as HTMLInputElement).value = "";
      }
      return;
    }
    const isValid = verifyPrivateKey(value);

    if (isValid) {
      try {
        const wallet = new ethers.Wallet(value);
        setWallet(wallet);
      } catch {
        setError("not a valid private key");
      }
    } else {
      setError("not a valid private key");
    }
  };

  return (
    <CssVarsProvider>
      <form onSubmit={handleSubmit}>
        <Sheet sx={{ display: "flex", alignItems: "start" }}>
          <FormControl
            error={!!error}
            sx={{
              width: "600px",
            }}
          >
            <Input
              disabled={!!wallet}
              ref={inputRef}
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              name="key"
              placeholder="Enter private key"
            />
            <FormHelperText>
              {" "}
              {error ? "Invalid private key" : " "}
            </FormHelperText>
          </FormControl>

          <Button
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              minWidth: 110,
            }}
            type="submit"
          >
            {wallet ? "Disconnect" : "Connect"}
          </Button>
        </Sheet>
      </form>
      <WalletProvider wallet={wallet}>
        <Test />
      </WalletProvider>
    </CssVarsProvider>
  );
}

export default App;
