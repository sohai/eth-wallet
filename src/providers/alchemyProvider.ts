import { providers } from 'ethers'

import { ChainProviderFn, FallbackProviderConfig } from '../types'

export type AlchemyProviderConfig = FallbackProviderConfig & {
    apiKey?: string
}

export function alchemyProvider({
    apiKey,
    priority,
    stallTimeout,
    weight,
}: AlchemyProviderConfig = {}): ChainProviderFn<
    providers.AlchemyProvider
> {
    return function (chain) {
        if (!chain.rpcUrls.alchemy) return null
        return {
            chain: {
                ...chain,
                rpcUrls: {
                    ...chain.rpcUrls,
                    default: `${chain.rpcUrls.alchemy}/${apiKey}`,
                },
            },
            provider: () => {
                const provider = new providers.AlchemyProvider(chain.id, apiKey)
                return Object.assign(provider, { priority, stallTimeout, weight })
            }
        }
    }
}