import Web3 from 'web3';

class BcHandler {
    web3Handler: Web3Caller

    constructor(cli: Web3) {
        this.web3Handler = new Web3Handler(cli);
    }

    async getWalletBalance(wallet: string): Promise<string> {
        const walletBalance = await this.web3Handler.getWalletBalance(wallet);
        return new Promise((resolve) => {
            resolve(walletBalance)
        })
    }
}

interface Web3Caller {
    // getWalletBalance calls web3.eth in order to get wallet balance
    getWalletBalance(wallet: string): Promise<string>;
}

class Web3Handler {
    web3Cli: Web3
    maxWalletChars: number = 8

    constructor(cli: Web3) {
        this.web3Cli = cli;
    }

    async getWalletBalance(wallet: string): Promise<string> {
        let balance: string = "";
        balance = await this.web3Cli.eth.getBalance(wallet);
        return new Promise((resolve) => {
            resolve(this.web3Cli.utils.fromWei(balance, "ether").substring(0, this.maxWalletChars));
        })

    }
}

export default BcHandler;