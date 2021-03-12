pragma solidity 0.8.2;

contract MyContract {
    string val;

    constructor() public {
        val = "default";
    }

    function get() public view returns (string memory) {
        return val;
    }

    function set(string memory _val) public {
        val = _val;
    }
}
