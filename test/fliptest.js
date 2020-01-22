const coinflip4u = artifacts.require("coinflip4u");

contract("coinflip4u", async function (accounts){
    let instance;

    before(async function () {
        instance = await coinflip4u.deployed();
    });

    it("should either return 0 or 1", async function(){
        let result = await instance.flip();
        console.log(result);
        assert(result.toNumber() === 0 || result.toNumber() === 1);
    })
})