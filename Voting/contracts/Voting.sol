// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

/// @title Voting with delegation
contract Voting {
    address public owner;

    struct Candidate {
        string name;
        uint256 votes;
    }

    struct Voter {
        uint256 inx;
        bool voted;
        bool hasRight;
        uint8 weight;
        address delegated; // voter can delegate another voter to vote insted of origin voter
    }

    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    constructor(string[] memory _candidates) {
        owner = msg.sender;
        voters[owner].weight = 1;
        voters[owner].hasRight = true;

        for (uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(Candidate({name: _candidates[i], votes: 0}));
        }
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can use it");
        _;
    }

    function giveRightToVote(address _addr) public onlyOwner {
        voters[_addr] = Voter({
            inx: 0,
            hasRight: true,
            weight: 1,
            voted: false,
            delegated: address(0)
        });
    }

    function delegateVoter(address _addr) public {
        Voter storage _voter = voters[msg.sender];
        require(!_voter.voted, "You already voted");
        require(
            _voter.delegated == address(0),
            "You already delegated someone"
        );
        require(msg.sender != _addr, "You cannot delegate yourself");

        _voter.delegated = _addr;
        _voter.voted = true; // not really, delegated person could not vote at all

        Voter storage _delegated = voters[_addr];
        if (_delegated.voted) {
            candidates[_delegated.inx].votes++;
        } else {
            _delegated.weight += 1;
        }
    }

    modifier onlyOnce {
        require(!voters[msg.sender].voted, "Person already voted!");
        _;
    }

    function vote(uint256 _proposal) public onlyOnce {
        candidates[_proposal].votes += voters[msg.sender].weight;
        voters[msg.sender].voted = true;
        voters[msg.sender].inx = _proposal;
    }

    function winningCandidate() public view returns (string memory winner) {
        uint256 winningCandidateVotesCount = 0;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].votes > winningCandidateVotesCount) {
                winner = candidates[i].name;
                winningCandidateVotesCount = candidates[i].votes;
            }
        }
    }
}
