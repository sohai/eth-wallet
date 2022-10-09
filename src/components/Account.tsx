import SendIcon from "@mui/icons-material/Send";
import { IconButton, Typography, Box } from "@mui/joy";
import { useState } from "react";
import ContentLoader from "react-content-loader";
import { useWallet } from "../context/wallet.context";
import useActiveChain from "../hooks/useActiveChain";
import { useBalance } from "../hooks/useBalance";
import Paper from "./Paper";
import SendTokenForm from "./SendTokenForm";
import SendTokenModal from "./SendTokenModal";

const BalanceLoadingPlaceholder = () => (
  <ContentLoader
    speed={2}
    width={200}
    height={32}
    viewBox="0 0 200 32"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="4" ry="4" width="200" height="32" />
  </ContentLoader>
);

export default function Account() {
  const wallet = useWallet();
  const address = wallet.address;
  const {
    data: balance,
    counter,
    error,
    status,
  } = useBalance({ address: wallet.address });

  const activeChain = useActiveChain();

  const [open, setOpen] = useState(false);

  return (
    <Paper
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography textAlign={"center"} level="body3" marginBottom={2}>
        Account: {address}
      </Typography>
      {status === "loading" && counter === 0 && <BalanceLoadingPlaceholder />}
      {((status === "loading" && counter > 0) || status === "success") && (
        <Box display="flex" alignItems={"center"}>
          <Typography marginRight={1} textAlign={"center"}>
            {balance} {activeChain?.nativeCurrency?.symbol}
          </Typography>

          <IconButton
            aria-label="Send"
            size="sm"
            color="primary"
            sx={{
              marginRight: 1,
            }}
            onClick={() => setOpen(true)}
          >
            <SendIcon />
          </IconButton>
        </Box>
      )}
      <SendTokenModal
        open={open}
        onClose={() => setOpen(false)}
        tokenSymbol={activeChain?.nativeCurrency?.symbol as string}
      >
        <SendTokenForm availableBalance={balance as string} />
      </SendTokenModal>
    </Paper>
  );
}
