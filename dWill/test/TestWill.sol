pragma solidity 0.8.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Will.sol";

contract TestWill {
    function testStore() public {
        Will w = new Will();
        w.store(200);

        Assert.equal(w.ethStorage(), 200, "storage does not equal");
    }
}
