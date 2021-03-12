const MyContract = artifacts.require("MyContract")
contract('MyContract', (accounts) => {
    it('should set val as 10', async () => {
        const myContractInstance = await MyContract.deployed();
        const defaultValue = await myContractInstance.get();

        assert.equal(defaultValue, 'default', "defaultValue is not 'defau't")

        myContractInstance.set('changed');

        const changedValue = await myContractInstance.get();

        assert.equal(changedValue, 'changed', "changedValue is not 'changed'")

    })
})