import { useCallback } from 'react';
import { useWallet } from '../context/wallet.context';
import useActiveChain from './useActiveChain';
import { useTransactionStore } from '../context/TransactionsStore.context';
import { NewTransaction } from '../utils/transactionStore';

export default function useAddRecentTransaction(): (
    transaction: NewTransaction
) => void {
    const store = useTransactionStore();
    const { address } = useWallet();
    const chain = useActiveChain();

    return useCallback(
        (transaction: NewTransaction) => {
            if (!address || !chain) {
                throw new Error('No address or chain ID found');
            }

            store.addTransaction(address, chain.id, transaction);
        },
        [store, address, chain?.id]
    );
}