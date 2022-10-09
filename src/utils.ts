import { ethers, providers } from "ethers";
import { Chain, ChainProviderFn, Provider, ProviderWithFallbackConfig } from "./types";

export const verifyPrivateKey = (value: string) => {
    if (ethers.utils.isHexString(value)) {
        return true;
    } else {
        if (value.length === 64) {
            return ethers.utils.isHexString(`0x${value}`);
        }
        return false;
    }
};
export type ConfigureChainsConfig = {
    pollingInterval?: number
    stallTimeout?: number
} & (
        | {
            targetQuorum?: number
            minQuorum?: never
        }
        | {
            targetQuorum: number
            minQuorum?: number
        }
    )

export const configureChains = (
    defaultChains: Chain[],
    providers: ChainProviderFn<Provider, Chain>[],
    {
        minQuorum = 1,
        pollingInterval = 4_000,
        targetQuorum = 1,
        stallTimeout,
    }: ConfigureChainsConfig = {},
) => {
    if (!defaultChains.length) throw new Error('must have at least one chain')
    if (targetQuorum < minQuorum)
        throw new Error('quorum cannot be lower than minQuorum')

    let chains: Chain[] = []

    const _providers: {
        [chainId: number]: (() => ProviderWithFallbackConfig<Provider>)[]
    } = {}
    for (const chain of defaultChains) {
        let configExists = false
        for (const provider of providers) {
            const apiConfig = provider(chain)

            // If no API configuration was found (ie. no RPC URL) for
            // this provider, then we skip and check the next one.
            if (!apiConfig) continue

            configExists = true

            if (!chains.some(({ id }) => id === chain.id)) {
                chains = [...chains, apiConfig.chain]
            }
            _providers[chain.id] = [
                ...(_providers[chain.id] || []),
                apiConfig.provider,
            ]
        }
        // If no API configuration was found across the providers
        // then we throw an error to the consumer.
        if (!configExists) {
            throw new Error(
                `Could not find valid provider configuration for chain "${chain.name}".\n`,
            )
        }

    }
    return {
        chains,
        getProvider: ({ chainId }: { chainId?: number }) => {
            const activeChain = <Chain>(
                (chains.find((x) => x.id === chainId) ?? defaultChains[0])
            )
            const chainProviders = _providers[activeChain.id]

            if (!chainProviders || !chainProviders[0])
                throw new Error(`No providers configured for chain "${activeChain.id}"`)

            let provider
            if (chainProviders.length === 1) {
                provider = chainProviders[0]()
            } else {
                provider = fallbackProvider(targetQuorum, minQuorum, chainProviders, {
                    stallTimeout,
                })
            }

            return Object.assign(provider, {
                chainId,
                chains,
                pollingInterval,
            })
        },
    }
}

function fallbackProvider(
    targetQuorum: number,
    minQuorum: number,
    _providers: (() => ProviderWithFallbackConfig<Provider>)[],
    { stallTimeout }: { stallTimeout?: number },
): providers.FallbackProvider {
    try {
        return new providers.FallbackProvider(
            _providers.map((chainProvider, index) => {
                const provider = chainProvider()
                return {
                    provider,
                    priority: provider.priority ?? index,
                    stallTimeout: provider.stallTimeout ?? stallTimeout,
                    weight: provider.weight,
                }
            }),
            targetQuorum,
        )
    } catch (error: any) {
        if (
            error?.message?.includes(
                'quorum will always fail; larger than total weight',
            )
        ) {
            if (targetQuorum === minQuorum) throw error
            return fallbackProvider(targetQuorum - 1, minQuorum, _providers, {
                stallTimeout,
            })
        }
        throw error
    }
}