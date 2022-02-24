import { expect } from "chai";

export default (): void => {
    it("Expected initial amount of allowance from addr1 to addr2 is 0", async function(): Promise<void> {
        const allowance = await this.instance.allowance(
            this.addr1.address,
            this.addr2.address
        );

        expect(allowance).to.equal(0);
    });
    it("Allowance of 50 is expected after approve from addr1 to addr2", async function(): Promise<void> {
        await this.instance.connect(this.addr1).approve(this.addr2.address, 50);

        const allowance = await this.instance.allowance(
            this.addr1.address,
            this.addr2.address
        );

        expect(allowance).to.equal(50);
    });
    it("Allowance of 50 is expected after increaseAllowance from addr1 to addr2", async function(): Promise<void> {
        await this.instance.connect(this.addr1).increaseAllowance(this.addr2.address, 50);

        const allowance = await this.instance.allowance(
            this.addr1.address,
            this.addr2.address
        );

        expect(allowance).to.equal(50);
    });
    it("Allowance of 25 is expected after increaseAllowance and decreaseAllowance from addr1 to addr2", async function(): Promise<void> {
        await this.instance.connect(this.addr1).increaseAllowance(this.addr2.address, 50);
        await this.instance.connect(this.addr1).decreaseAllowance(this.addr2.address, 25);

        const allowance = await this.instance.allowance(
            this.addr1.address,
            this.addr2.address
        );

        expect(allowance).to.equal(25);
    });
    it("Expected that you cannot increaseAllowance to a null address", async function(): Promise<void> {
        await expect(
            this.instance
            .connect(this.addr1)
            .increaseAllowance(this.zeroAddress, 50)
        ).to.be.revertedWith("Cannot be the zero address");
    });
    it("Expected that you cannot decreaseAllowance to a null address", async function(): Promise<void> {
        await expect(
            this.instance
            .connect(this.addr1)
            .decreaseAllowance(this.zeroAddress, 50)
        ).to.be.revertedWith("Cannot be the zero address");
    });
    it("Expected to decreaseAllowance if the allowance is less than 0", async function(): Promise<void> {
        await this.instance.connect(this.addr1).approve(this.addr2.address, 25);
        await expect(
            this.instance
            .connect(this.addr1)
            .decreaseAllowance(this.addr2.address, 50)
        ).to.be.revertedWith("The amount exceeds the allowance");
    });
    it("Expected that the null address cannot be approved", async function(): Promise<void> {
        await expect(
            this.instance
            .connect(this.addr1)
            .approve(this.zeroAddress, 50)
        ).to.be.revertedWith("Cannot be the zero address");
    });
    it("Expected null address cannot approve", async function(): Promise<void> {
        await expect(
            this.instance
            .connect(this.zeroAddress)
            .approve(this.addr1.address, 50)
        ).to.be.revertedWith("Cannot be the zero address");
    });
}