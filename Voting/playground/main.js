const Web3 = require('web3');
const VotingABI = require('./const.js')

web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

// Use Wb3 to get the balance of the address, convert it and then show it in the console.
web3.eth.getBalance("0x158E1291EAC7ecf2F0E2B644C0bE9b03Aa6f5C0D", function (error, result) {
    if (!error)
        console.log('Ether:', web3.utils.fromWei(result, 'ether')); // Show the ether balance after converting it from Wei
    else
        console.log('Huston we have a promblem: ', error); // Should dump errors here
});

web3.eth.getAccounts().
    then((accounts) => { console.log(accounts) })

console.log(VotingABI);
const voting = new web3.eth.Contract([
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_candidates",
                "type": "string[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "votes",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "voters",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "inx",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "voted",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "hasRight",
                "type": "bool"
            },
            {
                "internalType": "uint8",
                "name": "weight",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "delegated",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "giveRightToVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "delegateVoter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_proposal",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "winningCandidate",
        "outputs": [
            {
                "internalType": "string",
                "name": "winner",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
], '0x05A014f793781d7e809bB4E0D232f1D87668ff27');

voting.methods.candidates(0).call(function (error, result) {
    console.log(result);
    console.log(error)
});