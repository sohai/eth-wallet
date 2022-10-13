
import { Reducer, useEffect, useReducer, useState } from 'react';

type Action<T> =
    | { type: 'loading' }
    | { type: 'success', payload: T }
    | { type: 'error', payload: string }
    | { type: 'reset', payload: T | null };


type Status = 'loading' | 'success' | 'error' | 'init';

type State<T> = {
    status: Status,
    error: string | null
    data: T | null
}
function reducer<T>(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
        case 'loading':
            return { ...state, status: 'loading', error: null, };
        case 'success':
            return { ...state, status: 'success', data: action.payload };
        case 'error':
            return { ...state, status: 'error', error: action.payload, data: null };
        case "reset":
            return { ...state, status: 'init', error: null, data: action.payload };
        default:
            return state;
    }
}

export default function useAsync<K>({ asyncFn: asyncFn, initialData: propsInitialData, immediate = false }: { asyncFn: () => Promise<K>, initialData?: K, immediate?: boolean }) {

    const initialData = propsInitialData || null;

    const initialState: State<K> = {
        status: 'init',
        error: null,
        data: initialData
    };

    const [state, dispatch] = useReducer<Reducer<State<K>, Action<K>>>(reducer, initialState);
    const [counter, setCounter] = useState(0);

    const execute = () => {
        setCounter(counter + 1);
    };

    const reset = () => {
        dispatch({ type: 'reset', payload: initialData });
    };

    useEffect(() => {
        let requestCanceled = false;

        const fetchData = async () => {
            dispatch({ type: 'loading' });
            try {
                const response = await asyncFn();
                if (requestCanceled) return;
                dispatch({ type: 'success', payload: response });
            } catch (e: any) {
                if (requestCanceled) return;
                dispatch({ type: 'error', payload: e.message });
            }
        };

        if (immediate || counter > 0) {
            fetchData();
        }

        return function cleanup() {
            requestCanceled = true;
        };
    }, [asyncFn, immediate, counter]);

    return { ...state, counter, execute, reset };
}