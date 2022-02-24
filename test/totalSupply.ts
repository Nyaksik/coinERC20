import { expect } from "chai";

export default (): void => {
    it("The initial value of total supply is expected to be 0", async function(): Promise<void> {
        const totalSupply = await this.instance.totalSupply();

        expect(totalSupply).to.equal(0);
    });
    it("Expected after mint at 50 total supply is 50", async function(): Promise<void> {
        await this.instance.connect(this.owner).mint(this.addr1.address, 50);

        const totalSupply = await this.instance.totalSupply();
        
        expect(totalSupply).to.equal(50);
    });
    it("Expected after mint at 50 and burn at 25 total supply is 25", async function(): Promise<void> {
        await this.instance.connect(this.owner).mint(this.addr1.address, 50);
        await this.instance.connect(this.owner).burn(this.addr1.address, 25);

        const totalSupply = await this.instance.totalSupply();
        
        expect(totalSupply).to.equal(25);
    });
    it("The expected balance after mint is 50 equal to 50", async function(): Promise<void> {
        await this.instance.connect(this.owner).mint(this.addr1.address, 50);
        
        const balance = await this.instance.balanceOf(this.addr1.address);
        
        expect(balance).to.equal(50);
    });
    it("The expected balance after mint at 50 and burn at 25 is 25", async function(): Promise<void> {
        await this.instance.connect(this.owner).mint(this.addr1.address, 50);
        await this.instance.connect(this.owner).burn(this.addr1.address, 25);
        
        const balance = await this.instance.balanceOf(this.addr1.address);
        
        expect(balance).to.equal(25);
    });
    it("Expected only the owner can mint", async function(): Promise<void> {
        await expect(
            this.instance
            .connect(this.addr1)
            .mint(this.addr2.address, 50)
        ).to.be.revertedWith("You are not the owner");
    });
    it("Expected that you cannot mint to a null address", async function(): Promise<void> {
        await expect(
            this.instance
            .connect(this.owner)
            .mint(this.zeroAddress, 50)
        ).to.be.revertedWith("Cannot be the zero address");
    });
    it("Expected only the owner can burn", async function(): Promise<void> {
        await expect(
            this.instance
            .connect(this.addr1)
            .burn(this.addr2.address, 50)
        ).to.be.revertedWith("You are not the owner");
    });
    it("Expected that you cannot burn to a null address", async function(): Promise<void> {
        await expect(
            this.instance
            .connect(this.owner)
            .burn(this.zeroAddress, 50)
        ).to.be.revertedWith("Cannot be the zero address");
    });
    it("The expected balance amount is greater than the burn amount", async function(): Promise<void> {
        await this.instance.connect(this.owner).mint(this.addr1.address, 25);

        await expect(
            this.instance
            .connect(this.owner)
            .burn(this.addr1.address, 50)
        ).to.be.revertedWith("Must have at least amount tokens");
    });
}