var ERC721MintableComplete = artifacts.require('RealestateToken');
var BigNumber = require('bignumber.js');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1);
            await this.contract.mint(account_two, 2);
            await this.contract.mint(account_two, 3);
            await this.contract.mint(account_one, 4);

        })

        it('should return total supply', async function () {
            let res = await this.contract.totalSupply.call();
            console.log(res);
            assert.equal(res.toNumber(), 4, "Not correct!");
        })

        it('should get token balance', async function () { 
            let res1 = await this.contract.balanceOf.call(account_two);
            console.log(res1);
            assert.equal(res1.toNumber(), 3, "Not correct!");

            let res2 = await this.contract.balanceOf.call(account_one);
            assert.equal(res2.toNumber(), 1, "Not correct!");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let res = await this.contract.tokenURI.call(1);
            console.log(res);
            assert.equal(res, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Not correct!");
        })

        it('should transfer token from one owner to another', async function () {
            assert.equal(await this.contract.ownerOf.call(3), account_two, "Owner is not account_2!");
            await this.contract.transferFrom(account_two, account_one, 3, {from:account_two});
            assert.equal(await this.contract.ownerOf.call(3), account_one, "Ownership did not change!");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
            let reverted = false;
            try{
                await this.contract.mint(account_two, 1, {from: account_two});
            } catch(e){
                reverted = true;
            }
            let res = await this.contract.balanceOf.call(account_two);
            assert.equal(res.toNumber(), 0, "Not correct!");
            assert.equal(reverted, true, "Not reverted!");
        })

        it('should return contract owner', async function () { 
            let res = await this.contract.owner.call();
            assert.equal(res, account_one, "owner not correct!");
        })

    });
})