import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import logging from '../config/logging';

const NAMESPACE = "HANDLER";

class BcHandler {
    web3Handler: Web3Caller
    contract: Contract

    constructor(cli: Web3, contract: Contract) {
        this.web3Handler = new Web3Handler(cli);
        this.contract = contract;
    }

    async getWalletBalance(wallet: string): Promise<string> {
        const walletBalance = await this.web3Handler.getWalletBalance(wallet);
        return new Promise((resolve) => {
            resolve(walletBalance)
        })
    }

    async createDeposit(_from: string, _to: string, _value: string): Promise<any | null> {
        this.contract.methods.createDeposit(
            _to, 50000,
        )
            .send({ from: _from, value: _value })
            .then((result: any) => {
                return new Promise(_ => { })
            }).catch((err: Error) => {
                return new Promise((resolve) => { resolve(err) })
            });

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

    async createDeposit() {

    }
}

export default BcHandler;