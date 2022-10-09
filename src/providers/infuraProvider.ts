import { providers } from 'ethers'
import { ChainProviderFn, FallbackProviderConfig } from '../types'

export type InfuraProviderConfig = FallbackProviderConfig & {
    apiKey?: string
}

export function infuraProvider({
    apiKey,
    priority,
    stallTimeout,
    weight,
}: InfuraProviderConfig = {}): ChainProviderFn<
    providers.InfuraProvider
> {
    return function (chain) {
        if (!chain.rpcUrls.infura) return null
        return {
            chain: {
                ...chain,
                rpcUrls: {
                    ...chain.rpcUrls,
                    default: `${chain.rpcUrls.infura}/${apiKey}`,
                },
            },
            provider: () => {
                const provider = new providers.InfuraProvider(chain.id, apiKey)
                return Object.assign(provider, { priority, stallTimeout, weight })
            }
        }
    }
}