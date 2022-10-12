import { List, ListItem, ListItemContent, Typography } from "@mui/joy";
import { ethers } from "ethers";
import { useRecentTransactions } from "../hooks/useRecentTransactions";
import EtherscanLink from "./EtherscanLink";
import Paper from "./Paper";

export default function TransactionsHistory() {
  const transactions = useRecentTransactions();

  const hasAnyTransaction = transactions && transactions.length > 0;

  return (
    <Paper>
      {!hasAnyTransaction && (
        <Typography level="body2" textAlign="center">
          No recent transaction found
        </Typography>
      )}
      {hasAnyTransaction && (
        <List
          data-testid="recent-history-container"
          sx={{ "--List-decorator-size": "56px" }}
        >
          <ListItem>
            <ListItemContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography level="body3" textAlign="right">
                Recent transactions
              </Typography>
              <Typography level="body3" textAlign="right">
                Status
              </Typography>
            </ListItemContent>
          </ListItem>
          {transactions.map(({ status, hash, tokenSymbol, value, to }, idx) => (
            <ListItem
              key={hash}
              endAction={<Typography level="body2">{status}</Typography>}
            >
              <ListItemContent
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <EtherscanLink txHash={hash} level="body3">
                  {hash}
                </EtherscanLink>
                <Typography>
                  {ethers.utils.formatEther(value)} {tokenSymbol} sent to {to}
                </Typography>
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
