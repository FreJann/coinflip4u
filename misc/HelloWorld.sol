pragma solidity 0.5.12;

//Contract wrapper
contract HelloWorld{
    
    //State variables
    string public message = "Hello World";
    
    //Arrays
    uint[] public numbers = [1, 20, 45];
    
    //Structs (objects)
    struct Person{
        uint id;
        string name;
        uint age;
        uint height;
        address walletAddress;
    }
    
    //Call function
    //'view' shows that it does not modify the contract; it only retrieves information as it is a Getter
    //'returns' tells the 
    function getMessage() public view returns(string memory){
        return message;
    }
    
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    
    function getNumber(uint index) public view returns(uint){
        return numbers[index];
    }
    
    function setNumber(uint newNumber, uint index) public {
        numbers[index] = newNumber;
    }
    
    function addNumber(uint newNumber) public {
        numbers.push(newNumber);
    }
}