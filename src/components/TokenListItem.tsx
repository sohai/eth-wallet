import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, ListItem, ListItemContent, Typography } from "@mui/joy";
import { ethers } from "ethers";
import { useCallback, useMemo, useState } from "react";
import ContentLoader from "react-content-loader";
import { erc20ABI } from "../constants/abis";
import { useProvider } from "../context/provider.context";
import { useWallet } from "../context/wallet.context";
import useAsync from "../hooks/useAsync";
import { useBalance } from "../hooks/useBalance";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SendTokenForm from "./SendTokenForm";
import SendTokenModal from "./SendTokenModal";

const TokenListLineLoadingPlaceholder = (
  { height }: { height?: number } = { height: 24 }
) => (
  <ContentLoader
    speed={2}
    width={200}
    height={height}
    viewBox={`0 0 200 ${height}`}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="4" ry="4" width="200" height={height} />
  </ContentLoader>
);

export default function TokenListItem({ address }: { address: string }) {
  const provider = useProvider();
  const [open, setOpen] = useState(false);

  const contract = useMemo(() => {
    if (!address) return null;
    return new ethers.Contract(address, erc20ABI, provider);
  }, [address, provider]);

  const getTokenInfo: () => Promise<
    | {
        symbol: string;
        name: string;
        decimals: number;
      }
    | undefined
  > = useCallback(async () => {
    if (!contract) return;

    const [symbol, name, decimals] = await Promise.all([
      contract.symbol(),
      contract.name(),
      contract.decimals(),
    ]);

    return {
      symbol: symbol as string,
      name: name as string,
      decimals: decimals as number,
    };
  }, [contract]);

  //@TODO: create useToken hook
  const {
    data: tokenInfo,
    status: tokenInfoStatus,
    error: tokenInfoError,
  } = useAsync({
    asyncFn: getTokenInfo,
    initialData: null,
    immediate: true,
  });

  const wallet = useWallet();
  const {
    data: balance,
    status: balanceStatus,
    counter: balanceCounter,
    error: balanceError,
  } = useBalance({
    address: wallet.address,
    token: address,
  });

  const refreshingBalance = balanceStatus === "loading" && balanceCounter > 0;

  const [tokenList, setTokenList] = useLocalStorage<string[]>(
    `token-list-${wallet.address}-${provider.chainId}`,
    []
  );

  const handleRemoveTokenContractAddress = (contractAddress: string) =>
    setTokenList(tokenList.filter((ca) => ca !== contractAddress));

  return (
    <ListItem
      endAction={
        <>
          <IconButton
            aria-label="Send"
            size="sm"
            color="primary"
            sx={{
              marginRight: 1,
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <SendIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            size="sm"
            color="danger"
            onClick={() => handleRemoveTokenContractAddress(address)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography level="body4">{address}</Typography>

        {!tokenInfoError && (
          <>
            {tokenInfoStatus === "loading" && (
              <TokenListLineLoadingPlaceholder height={21} />
            )}
            {tokenInfoStatus === "success" && (
              <Typography level="body2">{tokenInfo?.name}</Typography>
            )}

            {balanceStatus === "loading" && balanceCounter === 0 && (
              <TokenListLineLoadingPlaceholder height={24} />
            )}
            {(balanceStatus === "success" || refreshingBalance) && (
              <Typography>
                {balance} {tokenInfo?.symbol}
              </Typography>
            )}
          </>
        )}
        {tokenInfoError && (
          <Typography color="warning" level="body2">
            Unable to retrieve token detail. Are you sure you are in the right
            network?
          </Typography>
        )}
      </ListItemContent>

      {tokenInfo && (
        <SendTokenModal
          open={open}
          onClose={() => setOpen(false)}
          tokenSymbol={tokenInfo.symbol as string}
        >
          <SendTokenForm
            contractAddress={address}
            availableBalance={balance as string}
            tokenSymbol={tokenInfo.symbol}
          />
        </SendTokenModal>
      )}
    </ListItem>
  );
}
