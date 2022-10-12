import { Link, LinkProps } from "@mui/joy";
import useActiveChain from "../hooks/useActiveChain";

export default function EtherscanLink({
  txHash,
  children,
  ...other
}: LinkProps & { txHash: string }) {
  const activeChain = useActiveChain();
  return (
    <Link
      disabled={!txHash}
      target="_blank"
      href={`https://${activeChain?.name}.etherscan.io/tx/${txHash}`}
      {...other}
    >
      {children || "Etherscan"}
    </Link>
  );
}
