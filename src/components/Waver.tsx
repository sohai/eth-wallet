import { Box, Button, CircularProgress, Typography } from "@mui/joy";
import { useCallback, useEffect, useMemo } from "react";
import { Waver__factory } from "../../typechain-types/factories/Waver__factory";
import { useProvider } from "../context/provider.context";
import { useWallet } from "../context/wallet.context";
import useAsync from "../hooks/useAsync";
import Paper from "./Paper";

const GOEARLI_WAVER_ADDRESS = "0x8357A2C8EC9C0D04694a848281517FF3693dD790";

//@TODO: handle errors
export default function Waver(props: { contractAddress?: string }) {
  const { contractAddress = GOEARLI_WAVER_ADDRESS } = props;

  const wallet = useWallet();
  const provider = useProvider();

  const waver = useMemo(() => {
    return Waver__factory.connect(contractAddress, wallet.connect(provider));
  }, [contractAddress, provider, wallet]);

  const wave = useCallback(async () => {
    console.log("waver1", waver.address);
    const waveTx = await waver.wave();
    console.log("waver", waveTx);
    await waveTx.wait();
  }, [waver]);

  const { execute: waveExecute, status: waveStatus } = useAsync({
    asyncFn: wave,
    immediate: false,
  });

  const getTotalWaves = useCallback(async () => {
    const totalWaves = await waver.getTotalWaves();
    return totalWaves;
  }, [waver]);

  const {
    data: totalWaves,
    execute: getTotalWavesExecute,
    status: totalWavesStatus,
    error,
  } = useAsync({
    asyncFn: getTotalWaves,
    immediate: true,
  });

  useEffect(() => {
    provider.on("block", () => {
      if (totalWavesStatus === "success") {
        getTotalWavesExecute();
      }
    });
    return () => {
      provider.off("block");
    };
  }, [provider, getTotalWavesExecute, totalWavesStatus]);

  const isWaving = waveStatus === "loading";

  return (
    <Paper>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>
          Wave counter: {totalWaves && totalWaves.toNumber()}
        </Typography>
        {totalWavesStatus === "loading" && <CircularProgress size="sm" />}
      </Box>
      <Button disabled={isWaving} onClick={() => waveExecute()}>
        {isWaving ? "Waving...." : "Wave"}
      </Button>
    </Paper>
  );
}
