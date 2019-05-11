pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./verifier.sol";
import "./ERC721Mintable.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is RealestateToken, Verifier{


// TODO define a solutions struct that can hold an index & an address
struct solution {
    uint256 _index;
    address _address;
}

// TODO define an array of the above struct
solution[] solutionArray;

// TODO define a mapping to store unique solutions submitted
mapping(bytes32 => solution) private solutions;

// TODO Create an event to emit when a solution is added
event SolutionAdded(uint256 _index, address _address);


// TODO Create a function to add the solutions to the array and emit the event
function addSolution(uint256 _index, address _address) public {
    bytes32 solutionHash = keccak256(abi.encodePacked(_index, _address));
    require(solutions[solutionHash]._address == address(0), "solution is not unique");
    solutions[solutionHash] = solution({
                                _index: _index,
                                _address: _address
                        });
    emit SolutionAdded(_index, _address);
}


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure you handle metadata as well as tokenSupply
function mintNFT(uint256 _index, address _address, uint[2] memory a, uint[2] memory a_p,
                 uint[2][2] memory b, uint[2] memory b_p, uint[2] memory c, uint[2] memory c_p,
                 uint[2] memory h, uint[2] memory k, uint[2] memory input) 
    public 
    returns (bool) 
    {
        require(verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "proof is invalid");
        //  - make sure the solution is unique (has not been used before)
        bytes32 solutionHash = keccak256(abi.encodePacked(_index, _address));
        require(solutions[solutionHash]._address == address(0), "solution is not unique");
        addSolution(_index, _address);
        return mint(_address, _index);
    }
}

























