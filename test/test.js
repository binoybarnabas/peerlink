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

  describe("images", async () => {
    let result, imageCount
    const hash = 'asc123 '
    before(
      async ()=>{
        result = await peerlink.uploadImage(hash,'Image description', {from:author})
        imageCount = await peerlink.imageCount()
      }
    )
    it("create images", async () => {
      //success
      assert.equal(imageCount,1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(),imageCount.toNumber(),'id is correct')
      assert.equal(event.hash,hash,'hash is correct')
      assert.equal(event.description,'Image description','description are same')
      assert.equal(event.tipAmount,'0','tip amount is correct')
      assert.equal(event.author,author,'author is correct')

      await peerlink.uploadImage('','Image description',{from:author}).should.be.rejected;

      await peerlink.uploadImage('Image hash','',{from:author}).should.be.rejected;
    });

    it('lists images',async ()=>{
      const image = await peerlink.images(imaegCount)
      assert.equal(image.id.toNumber(),imageCount.toNumber(),'id is correct')
      assert.equal(image.hash,hash,'hash is correct')
      assert.equal(image.description,'Image description','description are same')
      assert.equal(image.tipAmount,'0','tip amount is correct')
      assert.equal(image.author,author,'author is correct')
    });
  });
});
