pragma solidity 0.5.12;

contract coinflip4u {

    uint public balance;

    event coinFlipped(address sender, uint result);

    modifier costs(uint cost){
        require(msg.value >= cost);
        _;
    }
    
    function flip() public payable costs (0.05 ether) returns(uint)  {
        
        require(msg.value <= balance, "Contract doesn't have enough funds to pay out potential win");
        uint winnings;
        uint result = now % 2;
        emit coinFlipped(msg.sender, result);
        
        if(result == 0){
            winnings = 0.1 ether;
        }
        else(){
            winnings = 0 ether;
        }
        
        return winnings;
    }
    
}