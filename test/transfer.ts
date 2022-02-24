import { expect } from "chai";

export default (): void => {
    it("Initial balance is expected to be 0", async function(): Promise<void> {
        const balance = await this.instance.balanceOf(this.addr1.address)

        expect(balance).to.equal(0)
    });
    it("Balance2 is expected to be 50 after the transfer to 50, and the balance1 is 0", async function(): Promise<void> {
        await this.instance.connect(this.owner).mint(this.addr1.address, 50);
        await this.instance.connect(this.addr1).transfer(this.addr2.address, 50);

        const balance1 = await this.instance.balanceOf(this.addr1.address);
        const balance2 = await this.instance.balanceOf(this.addr2.address);

        expect(balance1).to.equal(0);
        expect(balance2).to.equal(50);
    });
    it("Is not possible to transfer to the zero address", async function(): Promise<void> {
        await expect(
            this.instance
            .connect(this.addr1)
            .transfer(this.zeroAddress, 50)
        ).to.be.revertedWith("Cannot be the zero address");
    });
    it("Expected null address cannot transfer", async function(): Promise<void> {
        await expect(
            this.instance
            .connect(this.zeroAddress)
            .transfer(this.addr1.address, 50)
        ).to.be.revertedWith("Cannot be the zero address");
    });
    it("Expected that it is impossible to transfer more balance", async function(): Promise<void> {
        await this.instance.connect(this.owner).mint(this.addr1.address, 25);
        await expect(
            this.instance
            .connect(this.addr1)
            .transfer(this.addr2.address, 50)
        ).to.be.revertedWith("Must have at least amount tokens");
    });
    it("Balance2 is expected to be 50 after the transferFrom to 50, and the balance1 is 0", async function(): Promise<void> {
        await this.instance.connect(this.owner).mint(this.addr1.address, 50);
        await this.instance.connect(this.addr1).approve(this.addr3.address, 50);
        await this.instance
            .connect(this.addr3)
            .transferFrom(
                this.addr1.address,
                this.addr2.address,
                50
            );

        const balance1 = await this.instance.connect(this.addr1).balanceOf(this.addr1.address);
        const balance2 = await this.instance.connect(this.addr2).balanceOf(this.addr2.address);
        
        expect(balance1).to.equal(0);
        expect(balance2).to.equal(50);
    });
    it("Expected that only the approve account can initiate the transferFrom", async function(): Promise<void> {
        await this.instance.connect(this.owner).mint(this.addr1.address, 50);
        await this.instance.connect(this.addr1).approve(this.addr3.address, 50);
        await expect(
            this.instance
                .connect(this.addr4)
                .transferFrom(
                    this.addr1.address,
                    this.addr2.address,
                    50
                )
        ).to.be.revertedWith("Unverified address");
    });
    it("Transfer from is expected cannot be more than an allowance", async function(): Promise<void> {
        await this.instance.connect(this.owner).mint(this.addr1.address, 25);
        await this.instance.connect(this.addr1).approve(this.addr3.address, 25);
        await expect(
            this.instance
                .connect(this.addr3)
                .transferFrom(
                    this.addr1.address,
                    this.addr2.address,
                    50
                )
        ).to.be.revertedWith("The amount exceeds the allowance");
    });
}