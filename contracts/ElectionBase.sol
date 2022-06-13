pragma solidity >=0.4.22 <0.8.0;

contract ElectionBase {

    //model
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // mapping k,v
    // no way to determine size, or to iterate over this
    mapping (uint=>Candidate) public candidates;

    uint public candidatesCount;

    // _var make a local variable, not a state variable
    // private function so someone else cant call this outside the contract
    function addCandidate(string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // constructor gets run anytime the contract is deployed
    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
        addCandidate("Candidate 3");
    }
}
