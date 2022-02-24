import { task } from "hardhat/config";

task("balance", "Account balance")
    .addParam("address", "Account address")
    .setAction(async ({ address }: { address: string}, { ethers }) => {
        const instance = await ethers.getContractAt(
            "CoinERC20",
            process.env.CONTRACT_ADDRESS as string
        );
        const balance = await instance.balanceOf(address);

        console.log(`${address} balance: ${balance}`);
    });

task("transfer", "Coin transfer")
    .addParam("to", "Recipient's address")
    .addParam("amount", "Amount of coins")
    .setAction(async ({ to, amount }: { to: string; amount: string }, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "CoinERC20",
            process.env.CONTRACT_ADDRESS as string,
            signer
        );

        await instance.transfer(to, amount);

        console.log(`${signer} transfer ${to} of ${amount} coins`);
    });

task("transferFrom", "Coin transfer from")
    .addParam("from", "Owner address")
    .addParam("to", "Recipient's address")
    .addParam("amount", "Amount of coins")
    .setAction(async ({ from, to, amount }: { from: string; to: string; amount: string}, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "CoinERC20",
            process.env.CONTRACT_ADDRESS as string,
            signer
        );

        await instance.transferFrom(from, to, amount);

        console.log(`${signer} transfer ${from} ${to} ${amount} coins`);
    });

task("approve", "Approve address")
    .addParam("spender", "Spender address")
    .addParam("amount", "Amount of coins")
    .setAction(async ({ spender, amount}: { spender: string; amount: string}, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "CoinERC20",
            process.env.CONTRACT_ADDRESS as string,
            signer
        );

        await instance.approve(spender, amount);

        console.log(`${signer} approve ${spender} for ${amount} coins`);
    });

task("allowance", "Amount of allowance")
    .addParam("owner", "Owner address")
    .addParam("spender", "Spender address")
    .setAction(async ({ owner, spender }: { owner: string; spender: string }, { ethers }) => {
        const instance = await ethers.getContractAt(
            "ShitcoinToken",
            process.env.CONTRACT_ADDRESS as string
        );
        const allowance = await instance.allowance(owner, spender);

        console.log(`The amount of the ${allowance} at the ${spender}`);
    });

task("mint", "Mint coins")
    .addParam("to", "Recipient's address")
    .addParam("amount", "Amount of coins")
    .setAction(async ({ to, amount }: { to: string; amount: string }, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "CoinERC20",
            process.env.CONTRACT_ADDRESS as string,
            signer
        );
        
        await instance.mint(to, amount);

        console.log(`Mint ${to} in the amount of ${amount}`);
    });

task("burn", "Burn coins")
    .addParam("from", "Holder's address")
    .addParam("amount", "Amount of coins")
    .setAction(async ({ from, amount }: { from: string; amount: string }, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "CoinERC20",
            process.env.CONTRACT_ADDRESS as string,
            signer
        );

        await instance.burn(from, amount);

        console.log(`Burn ${from} in the amount of ${amount}`);
    });