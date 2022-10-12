import { ethers, utils } from "ethers";
import { useCallback, useEffect, useMemo } from "react";
import { erc20ABI } from "../constants/abis";
import { useProvider } from "../context/provider.context";
import { useWallet } from "../context/wallet.context";
import useAsync from "./useAsync";

export function useBalance({ address, token }: { address: string | undefined | null, token?: string | undefined }) {

    const provider = useProvider();
    const wallet = useWallet();

    const contract = useMemo(
        () => {
            if (!token) return null;
            return new ethers.Contract(token, erc20ABI, provider)
        },
        [token, provider],
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

    }, [wallet, contract, provider])

    const result = useAsync({ asyncFn: fetchFn, initialData: null, immediate: false });

    useEffect(() => {

        provider.on('block', () => {
            if (result.status === 'success') {
                result.execute()
            }
        })
        return () => { provider.off('block') }
    }, [provider, result.execute, result.status]);

    return result;
}
