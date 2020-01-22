var web3 = new Web3(Web3.givenProvider);
var contractAddress = '0x39458b596B40DBe186AC8EBa9050Ba8d8DC0B47f';
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
    contractInstance.methods.flip().call().then(function (res) {
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