var web3 = new Web3(Web3.givenProvider);
var contractAddress = '0xb231F4a64D70D157cb17a763c73856B5A60911dc';
var contractInstance;

$(document).ready(function () {
    window.ethereum.enable().then(function (accounts) {
        contractInstance = new web3.eth.Contract(abi, contractAddress, {
            from: accounts[0]
        });
        console.log(contractInstance);
    });
    $("#flip_button").click(flip);
    $("#fund_button").click(fund);
    $("#retrieve_button").click(retrieve);
    $("#close_button").click(close);
});

function flip() {
    contractInstance.methods.flip().send({
        value: web3.utils.toWei("0.05", "ether")
    }).then(function (res) {
        let result_uint = res.events.coinFlipped.returnValues[1];
        console.log("Result: " + result_uint);
        if (result_uint == 0) {
            $("#result_output").text("Congratulations! You have won 0.1 ETH. The amount has been sent to your wallet.");
        } else {
            $("#result_output").text("Aww! You lost. Better luck next time!");
        }
    })
}

function fund() {
    contractInstance.methods.increaseFunds().send({
        value: web3.utils.toWei("1", "ether")
    }).then(function () {
        console.log("Funds increased");
    })
}

function retrieve() {
    contractInstance.methods.withdrawFunds().send().then(function (res) {
        console.log("Funds withdrawn: \n");
        console.log(res);
    })
}

function close() {
    contractInstance.methods.close().call().then(function () {
        console.log("Contract closed.");
    })
}