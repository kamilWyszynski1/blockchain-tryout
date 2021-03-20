pragma solidity 0.8.2;

contract Will {
    /*
    Concept:
        * someone wants to create will and deposit some amount of money
        * person does that and he'll be automatically emailed from time to time
          to ping contract in order to not allow withdrawing money before time
        * if person that deposited money won't ping smart contract (e.g. person is dead)
          withdrawal become possible and 

    */

    event Deposited(address indexed payee, uint256 weiAmount);
    event Withdrawn(address indexed payee, uint256 weiAmount);

    struct Deposit {
        uint256 amount;
        uint256 lastCall; // timestamp of last call
        uint256 offset; // how long after lastCall you can withdraw money
    }

    mapping(address => Deposit) private _deposits;

    function depositsOf(address _payee) public view returns (uint256) {
        return _deposits[_payee].amount;
    }

    /**
     * @dev create deposit for given address with given offset
     */
    function createDeposit(address _payee, uint256 _offset) public payable {
        uint256 exists = _deposits[_payee].lastCall;
        require(exists == 0, "Deposit already exists");

        _deposits[_payee] = Deposit({
            amount: msg.value,
            lastCall: block.timestamp,
            offset: _offset
        });
    }

    /**
     * @dev Stores the sent amount as credit to be withdrawn.
     * @param _payee The destination address of the funds.
     */
    function deposit(address _payee) public payable returns (bool) {
        uint256 amount = msg.value;
        require(msg.value != 0, "Value cannot be 0");

        uint256 exists = _deposits[_payee].lastCall;
        require(exists != 0, "Deposit does not exist");

        _deposits[_payee].amount += msg.value;
        _deposits[_payee].lastCall = block.timestamp;

        emit Deposited(_payee, amount);
        return true;
    }

    function ping(address _payee) public returns (bool) {
        uint256 exists = _deposits[_payee].lastCall;
        require(exists != 0, "Deposit does not exist");

        _deposits[_payee].lastCall = block.timestamp;
        return true;
    }

    function getDeposit(address _payee)
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        Deposit storage d = _deposits[_payee];

        return (d.amount, d.lastCall, d.offset);
    }

    /**
     * @dev Withdraw accumulated balance for a _payee.
     * @param _payee The address whose funds will be withdrawn and transferred to.
     */
    function withdraw(address payable _payee) public {
        require(_payee == msg.sender, "Only owner can withdraw money");
        uint256 exists = _deposits[_payee].lastCall;
        require(exists != 0, "Deposit does not exist");

        Deposit storage d = _deposits[_payee];

        require(
            block.timestamp - (d.lastCall + d.offset) > 0,
            "You cannot withdraw money yet"
        );

        uint256 payment = d.amount;
        d.amount = 0;

        _payee.transfer(payment);

        emit Withdrawn(_payee, payment);
    }
}
