// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Election {
    //State Variables
    uint public candidatesCount;
    address public owner;
    uint test;

    //Mappings
    mapping(uint => Candidate) public candidates;
    mapping(address => uint) public _candidates;
    mapping(address => bool) public voters;

    //Struct
    struct Candidate {
        uint id;
        string name;
        uint VoteCount;
    }

    // voted event
    event votedEvent(uint indexed _candidateId);
    // voted event
    event candidateAdded(uint indexed _candidateId);

    //Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        require(candidatesCount <= 10, "No more than 10 Candidates");
        _;
    }

    //Constructor
    constructor() {
        owner = msg.sender;
    }

    //Add a new candidate
    function addCandidate(
        address _candidate,
        string memory _name
    ) public onlyOwner {
        require(_candidates[_candidate] == 0, "Candidate already exists");
        candidatesCount++;
        _candidates[_candidate] = candidatesCount;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit candidateAdded(candidatesCount);
    }

    //Cast a vote to a valid candidate
    function castVote(uint candidateId) public {
        require(_candidates[msg.sender] == 0, "Candidate Can not vote");
        require(!voters[msg.sender]);
        require(
            candidateId > 0 && candidateId <= candidatesCount,
            "Invalid Candidate Id"
        );
        voters[msg.sender] = true;
        candidates[candidateId].VoteCount++;
        emit votedEvent(candidateId);
    }
}
