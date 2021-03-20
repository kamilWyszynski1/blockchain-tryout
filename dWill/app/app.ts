import express = require("express");
import Web3 from 'web3';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import moment from 'moment';

import testController from './controllers/test'
import Handler from './db/handler';
import { Will, Person } from "./models/will";
import test from "./controllers/test";

class ApiHandler {
    web3Handler: Web3Caller

    constructor(_web3Handler: Web3Caller) {
        this.web3Handler = _web3Handler;
    }

    getWalletBalance(req: Request, res: Response) {
        const walletID: string = req.params["wallet"];
        this.web3Handler.getWalletBalance(walletID).then(balance => {
            res.send(`balance is: ${balance} ETH`);
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

let web3 = new Web3("http://localhost:8545");

// Create a new express app instance
const app: express.Application = express();

app.use(express.json()); //Used to parse JSON bodies

const web3Cli: Web3Caller = new Web3Handler(web3);
const handler: ApiHandler = new ApiHandler(web3Cli);

function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
    let now: string = (moment(new Date())).format('DD-MMM-YYYY HH:mm:ss')
    console.info(`${now}: [INFO] ${request.method} ${request.path}`);
    next();
}

app.use(loggerMiddleware);

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.get('/balance/:wallet', handler.getWalletBalance.bind(handler))

app.post('/test', testController.testRoute)

app.listen(3000, function () {
    console.log("App is listening on port 3000!");
});


const testator: Person = {
    name: "testator",
    surname: "testatorSur",
    wallet: "testatorWallet",
    email: "testatorEmail"
}

const heir: Person = {
    name: "heir",
    surname: "heirSur",
    wallet: "heirWallet",
    email: "heirEmail"
}

Handler.insert(new Will(testator, heir, 123))