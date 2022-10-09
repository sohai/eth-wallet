import { Button, Sheet, TextField } from "@mui/joy";
import { ethers, Wallet } from "ethers";
import { FormEvent, useRef, useState } from "react";
import { verifyPrivateKey } from "../utils";

type PrivateKeyFormProps = {
  onSuccess: (wallet: Wallet | null) => void;
  onError: (msg: string) => void;
  connected: boolean;
};

export default function PrivateKeyForm({
  connected,
  onSuccess,
  onError,
}: PrivateKeyFormProps) {
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const formData = new FormData(event.target as HTMLFormElement);

    const value = formData.get("key") as string;
    if (!value) {
      // In case we disconnecting, reset input value
      if (inputRef.current?.firstChild) {
        (inputRef.current.firstChild as HTMLInputElement).value = "";
      }
      onSuccess(null);
      return;
    }
    const isValid = verifyPrivateKey(value);

    if (isValid) {
      try {
        const wallet = new ethers.Wallet(value);
        onSuccess(wallet);
      } catch {
        setError("not a valid private key");
        onError(error);
      }
    } else {
      setError("not a valid private key");
      onError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1 }}>
      <Sheet sx={{ display: "flex", alignItems: "start" }}>
        <TextField
          required
          disabled={connected}
          name="key"
          autoComplete="off"
          error={Boolean(error)}
          helperText={error ? "Invalid private key" : " "}
          placeholder="Enter private key"
          sx={{ flex: 1 }}
          componentsProps={{
            input: {
              ref: inputRef,
              //@ts-ignore
              sx: {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            },
          }}
        />
        <Button
          sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            minWidth: 110,
          }}
          type="submit"
        >
          {connected ? "Disconnect" : "Connect"}
        </Button>
      </Sheet>
    </form>
  );
}
