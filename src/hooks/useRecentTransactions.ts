

import { useEffect, useState } from 'react';
import { useTransactionStore } from '../context/TransactionsStore.context';
import useActiveChain from './useActiveChain';
import { useWallet } from '../context/wallet.context';

import type { Transaction } from '../utils/transactionStore';

export function useRecentTransactions(): Transaction[] {
    const store = useTransactionStore();
    const wallet = useWallet();
    const chain = useActiveChain();

    const address = wallet.address;

    const [transactions, setTransactions] = useState(() =>
        store && address && chain ? store.getTransactions(address, chain.id) : []
    );

    useEffect(() => {
        if (store && address && chain) {
            setTransactions(store.getTransactions(address, chain.id));

            return store.onChange(() => {
                setTransactions(store.getTransactions(address, chain.id));
            });
        }
    }, [store, address, chain?.id]);

    return transactions;
}