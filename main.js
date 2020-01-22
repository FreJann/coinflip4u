var web3 = new Web3(Web3.givenProvider);
var contractAddress = '0x36D84Afe89E3548644356bC4f1D75D77A9aE07F8';
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
});

function flip() {
    contractInstance.methods.flip().send({
        value: web3.utils.toWei("0.05", "ether")
    }).then(function (res) {
        console.log(res);
        //let int_res = res.toNumber();
        $("#result_output").text(res);
    })
}

function fund() {
    contractInstance.methods.increaseFunds().send({
        value: web3.utils.toWei("1", "ether")
    }).then(function () {
        console.log("Funds increased");
    })
}