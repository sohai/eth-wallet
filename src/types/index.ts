export type RpcProviderName = 'alchemy' | 'infura' | 'public'

type AddEthereumChainParameter = {
    /** A 0x-prefixed hexadecimal string */
    chainId: string
    chainName: string
    nativeCurrency?: {
        name: string
        /** 2-6 characters long */
        symbol: string
        decimals: number
    }
    rpcUrls: string[]
}

export type Chain = {
    /** ID in number form */
    id: number
    /** Human-readable name */
    name: string
    /** Internal network name */
    network: string
    /** Currency used by chain */
    nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
    /** Collection of RPC endpoints */
    rpcUrls: { [key in RpcProviderName]?: string } & {
        [key: string]: string
        default: string
    }
    /** ENS registry */
    ens?: {
        address: string
    }
    /** Flag for test networks */
    testnet?: boolean
}