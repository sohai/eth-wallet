import { Chain } from "../types"
import { alchemyRpcUrls, infuraRpcUrls, publicRpcUrls } from "./rpcs"

export const chainId = {
    mainnet: 1,
    ropsten: 3,
    rinkeby: 4,
    goerli: 5,
    kovan: 42,
    sepolia: 11155111
} as const

export type ChainName = keyof typeof chainId

export const mainnet: Chain = {
    id: chainId.mainnet,
    name: 'Ethereum',
    network: 'homestead',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        alchemy: alchemyRpcUrls.mainnet,
        default: publicRpcUrls.mainnet,
        infura: infuraRpcUrls.mainnet,
        public: publicRpcUrls.mainnet,
    },
    ens: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
}

export const ropsten: Chain = {
    id: chainId.ropsten,
    name: 'Ropsten',
    network: 'ropsten',
    nativeCurrency: { name: 'Ropsten Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        alchemy: alchemyRpcUrls.ropsten,
        default: publicRpcUrls.ropsten,
        infura: infuraRpcUrls.ropsten,
        public: publicRpcUrls.ropsten,
    },
    ens: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    testnet: true,
}

export const rinkeby: Chain = {
    id: chainId.rinkeby,
    name: 'Rinkeby',
    network: 'rinkeby',
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        alchemy: alchemyRpcUrls.rinkeby,
        default: publicRpcUrls.rinkeby,
        infura: infuraRpcUrls.rinkeby,
        public: publicRpcUrls.rinkeby,
    },
    ens: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    testnet: true,
}

export const goerli: Chain = {
    id: chainId.goerli,
    name: 'Goerli',
    network: 'goerli',
    nativeCurrency: { name: 'Goerli Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        alchemy: alchemyRpcUrls.goerli,
        default: publicRpcUrls.goerli,
        infura: infuraRpcUrls.goerli,
        public: publicRpcUrls.goerli,
    },
    ens: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    testnet: true,
}

export const kovan: Chain = {
    id: chainId.kovan,
    name: 'Kovan',
    network: 'kovan',
    nativeCurrency: { name: 'Kovan Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        alchemy: alchemyRpcUrls.kovan,
        default: publicRpcUrls.kovan,
        infura: infuraRpcUrls.kovan,
        public: publicRpcUrls.kovan,
    },
    testnet: true,
}

export const sepolia: Chain = {
    id: chainId.sepolia,
    name: 'Sepolia',
    network: 'sepolia',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: publicRpcUrls.sepolia,
        infura: infuraRpcUrls.sepolia,
        public: publicRpcUrls.sepolia,
    },
    testnet: true,
}

export default [mainnet, ropsten, rinkeby, goerli, kovan, sepolia]