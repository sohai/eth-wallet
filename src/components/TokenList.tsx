import { List, ListDivider } from "@mui/joy";
import { Fragment } from "react";
import { useProvider } from "../context/provider.context";
import { useWallet } from "../context/wallet.context";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AddTokenForm } from "./AddTokenForm";
import Paper from "./Paper";
import TokenListItem from "./TokenListItem";

export default function TokenList() {
  const provider = useProvider();
  const wallet = useWallet();

  const [tokenList] = useLocalStorage<string[]>(
    `token-list-${wallet.address}-${provider.chainId}`,
    []
  );

  return (
    <Paper>
      {tokenList && tokenList.length > 0 && (
        <List
          aria-labelledby="ellipsis-list-demo"
          sx={{ "--List-decorator-size": "56px" }}
        >
          {tokenList.map((contractAddress, idx) => (
            <Fragment key={contractAddress}>
              <TokenListItem address={contractAddress} />
              <ListDivider />
            </Fragment>
          ))}
        </List>
      )}
      <AddTokenForm />
    </Paper>
  );
}
