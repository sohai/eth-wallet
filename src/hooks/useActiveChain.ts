import { useProvider } from "../context/provider.context";

export default function useActiveChain() {
    const provider = useProvider();

    const activeChain = provider.chains?.find(({ id }) => id === provider.chainId);

    return activeChain;
}