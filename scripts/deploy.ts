import { ethers } from "hardhat";

async function main() {
  const CoinERC20 = await ethers.getContractFactory("CoinERC20");
  const coinERC20 = await CoinERC20.deploy();

  await coinERC20.deployed();

  console.log("CoinERC20 deployed to:", coinERC20.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
