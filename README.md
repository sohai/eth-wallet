## This projet uses

- [ethers](https://docs.ethers.io/v5/) to interact with ETH blockchain
- [Joy UI](https://mui.com/joy-ui/getting-started/overview/) for fast UI prototyping
- [Vite](https://vitejs.dev/) for building frontend
- [Vitest](https://vitest.dev/) for testing frontend
- [Playwright](https://playwright.dev/) for e2e tests
- [Hardhat](https://hardhat.org/) for smart contract development

Code inspiration

- [Rainbowkit](https://www.rainbowkit.com/)
- [wagmi](https://wagmi.sh/)

## Prerequisites

- node >= 16.x
- npm >= v7

## Clone repo

```
git clone git@github.com:sohai/eth-wallet.git
```

## Env variable

```
cp .env.sample .env
```

and add required values

Provider api keys are required to run application, test account private keys are required for e2e tests

## Install dependencies

```
npm install
```

## Development mode

```bash
npm run dev
```

## Unit tests

```bash
npm run test:unit
```

## E2E tests

E2E tests relay on locally preview production build, so we need to build the project first

```bash
npm run build
npm run test:e2e
```

## Compile smart contract

```
 npx hardhat compile --config hardhat.config.cjs
```

## Deploy smart contract

```
  npx hardhat run scripts/deploy.cjs --config hardhat.config.cjs
```

Waver smart contract is deployed on Goerli network - [Etherscan](https://goerli.etherscan.io/address/0x8357A2C8EC9C0D04694a848281517FF3693dD790)
