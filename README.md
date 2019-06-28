This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Upload files to IPFS

React app that connects to IPFS and adds a file to it. Once it's added, it sends the transaction hash to Ethereum smart contract that's deployed to Rinkeby, using user's MetaMask account.

## How it works

Main code is in `App.js` and it executes the following steps:

1. Get a file from the UI and convert it to a file buffer
2. Send the buffered file to IPFS and save the hash it returns
3. Use the user's MetaMask account to send the transaction hash to Ethereum contract for storage

## Build and run

1. Run `yarn` to install all dependencies
2. Run `yarn start` to bring up the UI on port `3000`
3. Run `yarn build` to create a production build

## Additional notes

#### 1. IPFS CORS settings

We need to enable CORS in IPFS API so localhost can talk to it. This is done by running the following commands in the terminal:

```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
```

#### 2. Contract

Smart contract that's deployed to Rinkeby: https://rinkeby.etherscan.io/address/0x24c1ca93cdce83a3311f68d079d5dac5b46accb2
