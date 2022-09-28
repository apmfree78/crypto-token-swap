# Token Swap Dapp

Clones the basic interface and swap functionality of a dapp such as Uniswap.

### Made using React, TypeScript, [RainbowKit](https://rainbowkit.com), [wagmi](https://wagmi.sh), [Next.js](https://nextjs.org/), and Ethers.js.

Right now app only swaps USDC and DAI. 

## How App works

Once user submits amount they want to swap, selects fee pool, and hit "Swap" here is what happens:

- getPool function is called using UniswapV3Factory contract to obtain pool address and pool immutables.
- This data is then used to call exactSingleInput function on the SwapRouter02 contract to execute the swap - before this happens user is asked to confirm the transaction through their wallet.
- If there is an error, an error message will appear to user right below swap input form
- if transaction is successfully submitted , then user will see success message below

### Outstanding issues

- There were a lot of issues with goerli testnet.  Was not getting pool addresses back for valid swaps. **However, Pool addresses came back successfully everytime when testing on mainnet.** Also, on goerli transactions would be successfully submitted to with transaction hash return (all inputs that were submitted were valid)  But then the smart contract would mysterious fail to complete the transaction.

### Future plans

- Show the wallet balance of each token being swapped. This is an easy call to balanceOf() function using the wallet address and token contract address.
- Show the recent transaction for the pool. You can grab these with the uniswap graphQL api (using thegraph).
- Calculate the estimated amount of the swapped token that user will recieve.  Tried doing this but was getting weird 'gas price cannot be estimated error'. Since this was not a core part of the assignment, will do in future.
- Add ability to swap any 2 tokens.  Once I get a comprehensive list of ERC20 tokens I can swap on Uniswap V3, with their addresses, would not be difficult to impliment a drop down to select the token user wants to swap.
