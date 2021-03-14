const Will = artifacts.require("Will");

contract('Will', (accounts) => {
    it('should send 1eth to contract', async () => {
        const willInstance = await Will.deployed();

        const deposited = await willInstance.deposit(accounts[0], { value: web3.utils.toWei('1', 'ether') })

        const balance = await web3.eth.getBalance(willInstance.address)
        assert.equal(balance, web3.utils.toWei('1', 'ether'), "balance not 1eth")
    }),
        it('should withdraw 1eth to address', async () => {
            const willInstance = await Will.new();
            const acc = accounts[3];

            const deposited = await willInstance.deposit(acc, { from: acc, value: web3.utils.toWei('1', 'ether'), gasPrice: 0 })
            const ib = await web3.eth.getBalance(willInstance.address)
            const _ = await willInstance.withdraw(acc)

            const instanceBalance = await web3.eth.getBalance(willInstance.address)
            const addressBalance = await web3.eth.getBalance(acc)

            assert.equal(instanceBalance, web3.utils.toWei('0', 'ether'), "instance balance not 1eth")
            assert.equal(addressBalance, web3.utils.toWei('100', 'ether'), "address balance not 100eth")

        })
})