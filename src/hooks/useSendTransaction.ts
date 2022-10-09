import { BigNumberish, ethers, utils } from "ethers";
import { useCallback, useMemo } from "react";
import { erc20ABI } from "../context/abis";
import { useProvider } from "../context/provider.context";
import { useWallet } from "../context/wallet.context";
import useAsync from "./useAsync";

export function useSendTransaction({ contractAddress }: { contractAddress?: string, to: string, value: BigNumberish }) {

    const provider = useProvider();
    const wallet = useWallet();

    const contract = useMemo(
        () => {
            if (!contractAddress) return null;
            return new ethers.Contract(contractAddress, erc20ABI, provider)
        },
        [contractAddress, provider],
    );

    const fetchFn: () => Promise<string | null> = useCallback(async () => {
        if (!address || !wallet) return null;
        if (token && contract) {
            const balance = await contract.balanceOf(address);
            const decimals = await contract.decimals();
            return utils.formatUnits(balance, decimals);
        }

        const balance = await provider.getBalance(wallet.address)
        return utils.formatEther(balance)

    }, [wallet, contract])

    const { state, refetch } = useAsync({ asyncFn: fetchFn, initialData: null, immediate: true });

    return state;
}
