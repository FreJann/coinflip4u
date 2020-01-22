pragma solidity 0.5.12;
import "./Ownable.sol";

contract coinflip4u is Ownable{

    uint public balance;

    event coinFlipped(address sender, uint result);

    modifier costs(uint cost){
        require(msg.value >= cost);
        _;
    }
    
    function flip() public payable costs (0.05 ether) returns(uint)  {
        
        require(msg.value <= balance, "Contract doesn't have enough funds to pay out potential win");
        balance += msg.value;
        uint winnings;
        uint result = now % 2;
        emit coinFlipped(msg.sender, result);
        
        if(result == 0){
            winnings = 0.1 ether;
            msg.sender.transfer(winnings);
        }
        else{
            winnings = 0 ether;
        }
        
        return winnings;
    }

    function increaseFunds() public payable costs (1 ether) {
        balance += msg.value;
    }
    
    function withdrawFunds() public onlyOwner returns(uint){
        uint toTransfer = balance;
        balance = 0;
        msg.sender.transfer(toTransfer);
        return toTransfer;
    }
    
}