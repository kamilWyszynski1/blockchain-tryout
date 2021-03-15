const Will = artifacts.require("Will");

contract('Will', (accounts) => {
    let instance;

    beforeEach(async function () {
        instance = await Will.new()
    });

    it('should create deposit', async () => {
        const d1 = await instance.createDeposit(accounts[0], 2592000, { value: web3.utils.toWei('1', 'ether') })
        let err = null;
        try {
            await instance.createDeposit(accounts[0], 2592000, { value: web3.utils.toWei('1', 'ether') })
        } catch (error) {
            err = error
            assert.equal(error.reason, "Deposit already exists")
        }
        assert.ok(err instanceof Error)
    });
    it('should create deposit, deposit 1eth and show it', async () => {
        const acc = accounts[1];

        const d1 = await instance.createDeposit(acc, 2592000, { value: web3.utils.toWei('1', 'ether') })
        await instance.deposit(acc, { value: web3.utils.toWei('1', 'ether') })

        let deposit = await instance.getDeposit(acc)
        assert.equal(deposit['0'].toString(), web3.utils.toWei('2', 'ether').toString(), "amount does not match")
        assert.equal(deposit['2'].toString(), '2592000', "offsets do not match")

    });
    it('should raise error beacuse deposit is not created', async () => {
        const acc = accounts[3];
        let err = null
        try {
            await instance.withdraw(acc, { from: acc })
        } catch (error) {
            err = error
            assert.equal(error.reason, "Deposit does not exist")
        }
        assert.ok(err instanceof Error)

    })
})