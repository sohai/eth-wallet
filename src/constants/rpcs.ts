import { ChainName } from './chains'

export const defaultAlchemyApiKey = '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC'
export const defaultInfuraApiKey = '84842078b09946638c03157f83405213'

export type RpcProviderName = 'alchemy' | 'infura' | 'public'

type AlchemyChains = Extract<
    ChainName,
    | 'mainnet'
    | 'ropsten'
    | 'rinkeby'
    | 'goerli'
    | 'kovan'
>
export const alchemyRpcUrls: Record<AlchemyChains, string> = {
    mainnet: 'https://eth-mainnet.alchemyapi.io/v2',
    ropsten: 'https://eth-ropsten.alchemyapi.io/v2',
    rinkeby: 'https://eth-rinkeby.alchemyapi.io/v2',
    goerli: 'https://eth-goerli.alchemyapi.io/v2',
    kovan: 'https://eth-kovan.alchemyapi.io/v2',
} as const

type InfuraChains = Extract<
    ChainName,
    | 'mainnet'
    | 'ropsten'
    | 'rinkeby'
    | 'goerli'
    | 'kovan'
    | 'sepolia'
>
export const infuraRpcUrls: Record<InfuraChains, string> = {
    mainnet: 'https://mainnet.infura.io/v3',
    ropsten: 'https://ropsten.infura.io/v3',
    rinkeby: 'https://rinkeby.infura.io/v3',
    goerli: 'https://goerli.infura.io/v3',
    kovan: 'https://kovan.infura.io/v3',
    sepolia: 'https://sepolia.infura.io/v3',
} as const

type PublicChains = Extract<
    ChainName,
    | 'mainnet'
    | 'ropsten'
    | 'rinkeby'
    | 'goerli'
    | 'kovan'
    | 'sepolia'
>
export const publicRpcUrls: Record<PublicChains, string> = {
    mainnet: `${alchemyRpcUrls.mainnet}/${defaultAlchemyApiKey}`,
    ropsten: `${alchemyRpcUrls.ropsten}/${defaultAlchemyApiKey}`,
    rinkeby: `${alchemyRpcUrls.rinkeby}/${defaultAlchemyApiKey}`,
    goerli: `${alchemyRpcUrls.goerli}/${defaultAlchemyApiKey}`,
    kovan: `${alchemyRpcUrls.kovan}/${defaultAlchemyApiKey}`,
    sepolia: 'https://rpc.sepolia.org',
} as const