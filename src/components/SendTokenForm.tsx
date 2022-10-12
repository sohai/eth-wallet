import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/joy";
import { Stack } from "@mui/system";
import { BigNumber, ethers } from "ethers";
import { FormEvent, useState } from "react";
import { erc20ABI } from "../constants/abis";
import { useProvider } from "../context/provider.context";
import { useWallet } from "../context/wallet.context";
import useAddRecentTransaction from "../hooks/useAddRecentTransactions";
import EtherscanLink from "./EtherscanLink";

type SendTokenFormProps = {
  availableBalance: string;
  contractAddress?: string;
  tokenSymbol: string;
};

export default function SendTokenForm({
  availableBalance,
  contractAddress,
  tokenSymbol,
}: SendTokenFormProps) {
  const wallet = useWallet();
  const provider = useProvider();
  const addRecentTransaction = useAddRecentTransaction();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState("");

  const [recipientAddressError, setRecipientAddressError] = useState("");
  const [amountError, setAmountError] = useState("");

  //@TODO: transactionsStore could be use instead
  const [txHash, setTxHash] = useState<string>("");

  //@TODO: That  should be useSendTransaction hook
  const handleSubmitEth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmittingError("");
    setRecipientAddressError("");
    setAmountError("");

    const formData = new FormData(event.target as HTMLFormElement);
    const amount = formData.get("amount") as string;
    const to = formData.get("recipientAddress") as string;
    let formValuesError = false;
    let value;
    if (!ethers.utils.isAddress(to)) {
      formValuesError = true;
      setRecipientAddressError("Invalid address");
    }
    try {
      value = contractAddress
        ? ethers.utils.parseUnits(amount, 18)
        : ethers.utils.parseEther(amount);
    } catch {
      formValuesError = true;
      setAmountError("Invalid amount value");
    }

    if (formValuesError) {
      return;
    }

    setIsSubmitting(true);
    try {
      const tx = {
        to,
        value: value,
      };
      const walletSigner = wallet.connect(provider);

      let txResponse;

      if (contractAddress) {
        const contract = new ethers.Contract(
          contractAddress,
          erc20ABI,
          walletSigner
        );
        txResponse = await contract.transfer(tx.to, tx.value);
      } else {
        txResponse = await walletSigner.sendTransaction(tx);
      }

      addRecentTransaction({
        hash: txResponse.hash,
        tokenSymbol,
        to: txResponse.to,
        value: value as BigNumber,
      });

      setTxHash(txResponse.hash);
      await txResponse.wait();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setSubmittingError(e.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittingError("");
    setIsSubmitting(false);
    setTxHash("");
  };

  // const isSuccess =
  //   Boolean(txHash) && !Boolean(submittingError) && !isSubmitting;

  return (
    <form onSubmit={handleSubmitEth}>
      <Stack
        spacing={2}
        sx={{
          justifyContent: isSubmitting ? "center" : "stretch",
          minWidth: "380px",
        }}
      >
        {!isSubmitting && !submittingError && !Boolean(txHash) && (
          <>
            <TextField
              error={Boolean(recipientAddressError)}
              name="recipientAddress"
              placeholder="Enter recipient address"
              required
              helperText={recipientAddressError}
            />
            <TextField
              error={Boolean(amountError)}
              name="amount"
              placeholder="Enter amount"
              required
              helperText={
                amountError
                  ? amountError
                  : `Balance ${availableBalance} ${tokenSymbol}`
              }
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="soft"
              endDecorator={<SendIcon />}
            >
              Send
            </Button>
          </>
        )}
        {isSubmitting && (
          <>
            <CircularProgress size="lg" sx={{ alignSelf: "center" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>
                {Boolean(txHash) ? "Waiting for confirmation" : "Sending"}
              </Typography>
              <EtherscanLink txHash={txHash as string} />
            </Box>
          </>
        )}
        {!isSubmitting && !submittingError && txHash && (
          <>
            <CheckCircleIcon
              sx={{ fontSize: "64px", alignSelf: "center" }}
              color="success"
            />
            <EtherscanLink txHash={txHash} sx={{ alignSelf: "end" }} />
          </>
        )}

        {/*@TODO: Better ux for errors */}
        {submittingError && (
          <>
            <div>{submittingError}</div>
            <Button variant="soft" color="primary" onClick={handleReset}>
              Reset
            </Button>
          </>
        )}
      </Stack>
    </form>
  );
}
