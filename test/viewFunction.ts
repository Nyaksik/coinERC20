import { expect } from "chai";

export default (): void => {
    it("The contract name is expected to be \"NyanNyanCoin\"", async function(): Promise<void> {
        const name = await this.instance.name();
        
        expect(name).to.equal("NyanNyanCoin");
    });
    it("The \"NNC\" contract symbol is expected", async function(): Promise<void> {
        const symbol = await this.instance.symbol();

        expect(symbol).to.equal("NNC");
    });
    it("The decimals of the contract is expected to be \"18\"", async function(): Promise<void> {
        const decimals = await this.instance.decimals();

        expect(decimals).to.equal(18);
    });
    it("Total Supply of the contract is expected to be 0", async function(): Promise<void> {
        const totalSupply = await this.instance.totalSupply();

        expect(totalSupply).to.equal(0);
    })
}