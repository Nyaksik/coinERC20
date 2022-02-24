# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case.

# Basic commands

## Use it to launch a local blockchain

```TypeScript
npx hardhat node
// or
yarn start
```

## Use it to compile the contract

```TypeScript
npx hardhat clean && npx hardhat compile
// or
yarn compile
```

## Use it to deploy the contract locally

```TypeScript
npx hardhat run scripts/deploy.ts --network localhost
// or
yarn local
```

## Use it to deploy the contract in the rinkeby test network

```TypeScript
npx hardhat run scripts/deploy.ts --network rinkeby
// or
yarn rinkeby
```

## Use it to test

```TypeScript
npx hardhat test
// or
yarn test
```

## Use it to view the test coverage

```TypeScript
npx hardhat coverage
// or
yarn coverage
```

## Use it to view global options and available tasks

```TypeScript
npx hardhat help
// or
yarn help
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```TypeScript
npx hardhat run scripts/deploy.ts --network rinkeby
// or
yarn rinkeby
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```TypeScript
npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
