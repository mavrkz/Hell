const NFT = artifacts.require("NFT");

contract("NFT", (accounts) => {
    let myNFT;

    before(async () => {
        myNFT = await NFT.new("NFT", "MTK", "1");
    });

    it("should have correct name and symbol", async () => {
        const name = await myNFT.name();
        const symbol = await myNFT.symbol();
        assert.equal(name, "NFT");
        assert.equal(symbol, "MTK");
    });

    it("should be able to mint a new token", async () => {
        const uri = "https://example.com/mytoken";
        await myNFT.safeMint(accounts[0], uri);
        const tokenURI = await myNFT.tokenURI(0);
        assert.equal(tokenURI, uri);
    });

    it("should have correct balance", async () => {
        const balance = await myNFT.balanceOf(accounts[0]);
        assert.equal(balance, 1);
    });

    it("should be able to transfer a token", async () => {
        await myNFT.transferFrom(accounts[0], accounts[1], 0);
        const balance1 = await myNFT.balanceOf(accounts[0]);
        const balance2 = await myNFT.balanceOf(accounts[1]);
        assert.equal(balance1, 0);
        assert.equal(balance2, 1);
    });

    it("should allow the owner to pause and unpause the contract", async () => {
        const isPaused = await myNFT.paused();

        assert.equal(isPaused, false);

        await myNFT.pause({ from: accounts[0] });
        const isPausedAfterPause = await myNFT.paused();
        assert.equal(isPausedAfterPause, true);

        await myNFT.unpause({ from: accounts[0] });
        const isPausedAfterUnpause = await myNFT.paused();
        assert.equal(isPausedAfterUnpause, false);
    });
});
