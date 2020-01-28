pragma solidity 0.5.12;
import "./Ownable.sol";
import "https://github.com/provable-things/ethereum-api/provableAPI.sol";

contract coinflip4u is Ownable, usingProvable{

    uint public balance;
    uint256 constant NUM_RANDOM_BYTES_REQUESTED = 1;
    uint256 public latestNumber;

    event coinFlipped(address sender, uint result);
    event LogNewProvableQuery(string description);
    event generatedRandomNumber(uint256 randomNumber);

    modifier costs(uint cost){
        require(msg.value >= cost, "Value insufficient");
        _;
    }

    constructor() public{
        update();
    }
    
    function __callback(bytes32 _queryID, string memory _result, bytes memory _proof) public{
        require(msg.sender == provable_cbAddress());

        uint256 randomNumber = uint256(keccak256(abi.encodePacked(_result))) % 2;
        latestNumber = randomNumber;
        emit generatedRandomNumber(randomNumber);
    }

    function update() payable public {
        uint256 QUERY_EXECUTION_DELAY = 0;
        uint256 GAS_FOR_CALLBACK = 200000;
        provable_newRandomDSQuery(QUERY_EXECUTION_DELAY, NUM_RANDOM_BYTES_REQUESTED, GAS_FOR_CALLBACK);
        emit LogNewProvableQuery("Provable query was sent, standing by for answer...");
    }

    function flip() public payable costs(0.05 ether) returns(uint)  {
        
        require(msg.value <= balance, "Contract doesn't have enough funds to pay out potential win");

        balance += msg.value;
        //uint result = now % 2;
        uint result = latestNumber;
        emit coinFlipped(msg.sender, result);
        if(result == 0){
            balance -= 0.1 ether;
            msg.sender.transfer(0.1 ether);
        }
        
        return result;
    }

    function increaseFunds() public payable costs(1 ether) {
        balance += msg.value;
    }
    
    function withdrawFunds() public onlyOwner returns(uint){
        uint transferredBalance = balance;
        balance = 0;
        msg.sender.transfer(transferredBalance);
        return transferredBalance;
    }
    
    function close() public onlyOwner{
        msg.sender.transfer(balance);
        balance = 0;
        selfdestruct(msg.sender);
    }
}