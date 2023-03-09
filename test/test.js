const Peerlink = artifacts.require("./Peerlink.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Peerlink", ([deployer, author, tipper]) => {
  let peerlink;

  before(async () => {
    peerlink = await Peerlink.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await peerlink.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await peerlink.name();
      assert.equal(name, "Peerlink");
    });
  });
});
