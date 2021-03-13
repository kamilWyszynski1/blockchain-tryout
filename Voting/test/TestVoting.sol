pragma solidity 0.8.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Voting.sol";

contract TestVoting {
    function testConstructor() public {
        Voting voting = Voting(DeployedAddresses.Voting());

        Assert.equal(voting.owner, tx.origin, "owner does not match");
    }
}
