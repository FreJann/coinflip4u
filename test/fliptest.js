const coinflip4u = artifacts.require("coinflip4u");
const truffleAssert = require("truffle-assertions");

contract("coinflip4u", async function (accounts) {
    let instance;

    before(async function () {
        instance = await coinflip4u.deployed();
    });

    /*it("should either return 0 or 1", async function () {
        let instance = await coinflip4u.new();
        await instance.increaseFunds({
            value: web3.utils.toWei("1", "ether")
        });
        let result = await instance.flip({
            value: web3.utils.toWei("0.05", "ether")
        });
        let readableResult = result.toNumber();
        console.log(readableResult);
        assert(readableResult === 0 || readableResult === 1);
    });*/

    it("should increase the funds correctly", async function () {
        let instance = await coinflip4u.new();
        await instance.increaseFunds({
            value: web3.utils.toWei("1", "ether")
        });
        let balance = await instance.balance();
        let floatBalance = parseFloat(balance);

        let realBalance = await web3.eth.getBalance(instance.address);

        assert(floatBalance == web3.utils.toWei("1", "ether") && floatBalance == realBalance)
    });

    it("should allow the owner to withdraw balance", async function () {
        let instance = await coinflip4u.new();
        await instance.increaseFunds({
            from: accounts[2],
            value: web3.utils.toWei("1", "ether")
        });
        await truffleAssert.passes(instance.withdrawFunds({
            from: accounts[0]
        }));
    });
    it("should not allow a non-owner to withdraw balance", async function () {
        let instance = await coinflip4u.new();
        await instance.increaseFunds({
            from: accounts[2],
            value: web3.utils.toWei("1", "ether")
        });
        await truffleAssert.fails(instance.withdrawFunds({
            from: accounts[2]
        }), truffleAssert.ErrorType.REVERT);
    });
    it("owners balance should increase after withdrawal", async function () {
        let instance = await coinflip4u.new();
        await instance.increaseFunds({
            from: accounts[2],
            value: web3.utils.toWei("1", "ether")
        });

        let balanceBefore = parseFloat(await web3.eth.getBalance(accounts[0]));
        await instance.withdrawFunds();
        let balanceAfter = parseFloat(await web3.eth.getBalance(accounts[0]));
        assert(balanceBefore < balanceAfter, "Owners balance was not increased after withdrawal");

    });
    it("should reset balance to 0 after withdrawal", async function () {
        let instance = await coinflip4u.new();
        await instance.increaseFunds({
            from: accounts[2],
            value: web3.utils.toWei("1", "ether")
        });

        await instance.withdrawFunds();

        let balance = await instance.balance();
        let floatBalance = parseFloat(balance);

        let realBalance = await web3.eth.getBalance(instance.address);

        assert(floatBalance == web3.utils.toWei("0", "ether") && floatBalance == realBalance, "Contract balance was not 0 after withdrawal or did not match")

    })
});