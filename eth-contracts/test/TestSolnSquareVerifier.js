var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var BigNumber = require('bignumber.js');

contract('verifier', accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];
    const proof = {
        "proof":
	{
		"A":["0x0b5739c1c6519a28cccc418a23898c710291012d995e5a600ff0c3a9f9101297", "0x0fc129ac3cd04a7f398bc99f19a9abea311703975ce0db89e1477e2d1e19815e"],
		"A_p":["0x2fd6d274e2b1c4e4c7438f805d114da62e17d10d36964d48f63111fcf92b4117", "0x01c83795f4fc4e2b16ef4d36bc0de396b5f2978bb7b79e22ed856d4e40e81132"],
		"B":
			[["0x16b982ba22d73d2c2e18dd10fdda3a2d43d9a8e66504fce58c11a88885add5b2", "0x05babe49c005ea122d8dba6c17317dc9a1fd59d785e6e6b912a341715990e9d3"], ["0x12ce6b9da16bd46d1ef84091d1a7b7e67001709280ae7485a8fad9765b62f673", "0x0df6d54f01bade3f27abc2d9e721d22a339f30ead26fb2484c8a855d51f92042"]],
		
		"B_p":["0x01278d51ab138b9f3acd3ad4540370044ee37461cc1a92b1414c9fcee37ad3f6", "0x2970e6dd4a66d56af065596cae51c7d1e2402d89535f20027c1ff0596d1fee0b"],
		"C":["0x2afc42708560c409908a58ee799e3f0d892b3ea34d90a0e0344eed2415d8f238", "0x086cf96052cb63a2e788cf3c703c49af4ecb9787d4a95fff64c28a6c8b0b5ba2"],
		"C_p":["0x1a40d9aff698e37051bdd7254b10949f724cf640cfdd610e08a7652970e4dd2b", "0x245c57408179b6a7d81b1a3ac4f803f88e81e5007d0a5c54a3b13427a114ebd2"],
		"H":["0x29c82845b5a9e0f553410389f679cc7a04642dc2e1ffd77af31ca7c5e84774d7", "0x166571e400c359766e1d8d32f61f0bf6e093d6a5924a61116edb9aebcf557b66"],
		"K":["0x0342193094c1958f697337dcb615189bdac120a32e48a72a91cd0605c62ce39a", "0x0979aabb6f941e05dc1049d4fb77d5a1a682b01c72834dac6be928ea556979d0"]
	},
	"input":[0000000000000000000000000000000000000000000000000000000000000004,0000000000000000000000000000000000000000000000000000000000000001]
    };
    
    describe('testing solnSquareVerifier contract', function () {
        beforeEach(async function () { 
            this.contract = await SolnSquareVerifier.new({from: account_one});  
        })

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('a new solution can be added', async function () {
            let res = await this.contract.mintNFT.call(1, account_two, proof.proof.A, proof.proof.A_p,
                proof.proof.B, proof.proof.B_p, proof.proof.C,
                proof.proof.C_p, proof.proof.H, proof.proof.K,
                proof.input, {from: account_one});
            assert.equal(res, true, "solution not added!");
        })

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('an ERC721 token can be minted', async function () { 
            let res = await this.contract.mintNFT(2, account_two, proof.proof.A, proof.proof.A_p,
                                                        proof.proof.B, proof.proof.B_p, proof.proof.C,
                                                        proof.proof.C_p, proof.proof.H, proof.proof.K,
                                                        proof.input, {from: account_one});

            let res1 = await this.contract.totalSupply.call();
            assert.equal(res1.toNumber(), 1, "Not correct!");
        })      
    });
})

