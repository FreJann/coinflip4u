pragma solidity 0.5.12;

contract Ownable{
    address public owner;

    modifier onlyOwner(){
        require(msg.sender == owner, "Caller is not owner");
        _; //Continue execution
    }

    constructor() public{
        owner = msg.sender;
    }
}