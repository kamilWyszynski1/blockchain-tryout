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

    mapping(address => uint256) private _deposits;

    function depositsOf(address _payee) public view returns (uint256) {
        return _deposits[_payee];
    }

    /**
     * @dev Stores the sent amount as credit to be withdrawn.
     * @param _payee The destination address of the funds.
     */
    function deposit(address _payee) public payable {
        uint256 amount = msg.value;
        _deposits[_payee] = _deposits[_payee] + amount;

        emit Deposited(_payee, amount);
    }

    /**
     * @dev Withdraw accumulated balance for a _payee.
     * @param _payee The address whose funds will be withdrawn and transferred to.
     */
    function withdraw(address payable _payee) public {
        require(_payee == msg.sender, "Only owner can withdraw money");

        uint256 payment = _deposits[_payee];

        _deposits[_payee] = 0;

        _payee.transfer(payment);

        emit Withdrawn(_payee, payment);
    }
}
