// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
//var ERC721MintableComplete = artifacts.require("RealestateToken");

module.exports = function(deployer) {
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier);
  //deployer.deploy(ERC721MintableComplete);
};
