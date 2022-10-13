import { act, renderHook, waitFor } from '@testing-library/react'
import useAsync from './useAsync';

describe('useAsync', () => {
    it('should return expected value on success', async () => {

        const expectedValue = 'expectedValue'

        const asyncFn = async () => { return expectedValue };

        const { result } = renderHook(() => useAsync({ asyncFn, immediate: true }));

        await waitFor(() => {
            expect(result.current.data).toBe(expectedValue);
            expect(result.current.counter).toBe(0);
            expect(result.current.error).toBe(null);
            expect(result.current.status).toBe('success');

        });
    });
    it('should return error failure', async () => {

        const asyncFn = async () => { throw new Error('error') };

        const { result } = renderHook(() => useAsync({ asyncFn, immediate: true }));

        await waitFor(() => {
            expect(result.current.data).toBe(null);
            expect(result.current.error).toBe('error');
            expect(result.current.counter).toBe(0);
            expect(result.current.status).toBe('error');

        });
    })
    it('should wait for execution when immediate is false', async () => {

        const asyncFn = async () => { return null };

        const { result } = renderHook(() => useAsync({ asyncFn, immediate: false }));

        expect(result.current.data).toBe(null);
        expect(result.current.counter).toBe(0);
        expect(result.current.status).toBe('init');

    });
    it('should execute immediate', async () => {

        const expectedValue = 'expectedValue'
        const asyncFn = async () => { return expectedValue };

        const { result } = renderHook(() => useAsync({ asyncFn, immediate: false }));

        expect(result.current.data).toBe(null);
        expect(result.current.counter).toBe(0);
        expect(result.current.status).toBe('init');

        act(() => {
            result.current.execute()
        })

        await waitFor(() => {
            expect(result.current.status).toBe('success')
        });
        expect(result.current.data).toBe(expectedValue)

    });
    it('should has loading status durning execution', async () => {
        const expectedValue = 'expectedValue'
        const asyncFn = async () => expectedValue;

        const { result } = renderHook(() => useAsync({ asyncFn, immediate: true }));

        await waitFor(() => {
            expect(result.current.status).toBe('loading')
        });
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);

        await waitFor(() => {
            expect(result.current.status).toBe('success')
        });
        expect(result.current.data).toBe(expectedValue)

    });

    it('should counter increase on next execute', async () => {
        const expectedValue = 'expectedValue'
        const asyncFn = async () => { return expectedValue };

        const { result } = renderHook(() => useAsync({ asyncFn, immediate: true }));

        await waitFor(() => {
            expect(result.current.status).toBe('success');
        });
        expect(result.current.counter).toBe(0)

        act(() => {
            result.current.execute()
        })

        await waitFor(() => {
            expect(result.current.counter).toBe(1);
        });
    })
});