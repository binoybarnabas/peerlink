const Peerlink = artifacts.require("Peerlink");

module.exports = function(deployer) {
  // Code goes here...
  deployer.deploy(Peerlink);
};