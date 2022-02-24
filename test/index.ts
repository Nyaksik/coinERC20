import { artifacts, ethers, waffle } from "hardhat";
import { Artifact } from "hardhat/types"

import allowance from "./allowance";
import totalSupply from "./totalSupply";
import transfer from "./transfer";
import viewFunction from "./viewFunction";

describe("Contract testing", function () {
  before(async function() {
    this.zeroAddress = "0x0000000000000000000000000000000000000000";
    [this.owner, this.addr1, this.addr2, this.addr3, this.addr4] = await ethers.getSigners();
  });
  beforeEach(async function() {
    const arifact: Artifact = await artifacts.readArtifact("CoinERC20");
    this.instance = await waffle.deployContract(this.owner, arifact, []);
  });

  viewFunction();
  totalSupply();
  allowance();
  transfer();
});
