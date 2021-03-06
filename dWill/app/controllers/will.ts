import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Will from '../models/will';
import Web3 from 'web3';
import config from '../config/config';
import BcHandler from '../blockchain/handler';
import logging from '../config/logging';

const NAMESPACE = "CONTROLLER";
let web3 = new Web3(config.blockchain.url);

web3.eth.net.isListening()
    .then(() => logging.info(NAMESPACE, "web3 connected"))
    .catch(e => logging.error(NAMESPACE, "web3 connection error", e));

const bcHandler = new BcHandler(web3, new web3.eth.Contract(config.blockchain.abi, config.blockchain.willContractAddress));

const createWill = async (req: Request, res: Response, next: NextFunction) => {
    let {
        testatorName,
        testatorSurname,
        testatorWallet,
        testatorEmail,
        heirName,
        heirSurname,
        heirWallet,
        heirEmail,
        timeOffset,
        value,
    } = req.body;
    const now = new Date();

    try {
        await bcHandler.createDeposit(
            testatorWallet,
            heirWallet,
            web3.utils.toWei("1", "ether"),
        )
        console.log("here");

    } catch (err) {
        logging.error(NAMESPACE, "error when creating deposit", err.data)
        res.status(500).send({
            message: "error occured during deposit creation"
        })
        return
    }


    const nextPingDeadline = now.getTime() + timeOffset;
    const will = new Will({
        _id: new mongoose.Types.ObjectId(),
        testatorName,
        testatorSurname,
        testatorWallet,
        testatorEmail,
        heirName,
        heirSurname,
        heirWallet,
        heirEmail,
        nextPingDeadline
    });

    return will
        .save()
        .then((result) => {
            return res.status(201).json({
                will: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllWills = (req: Request, res: Response, next: NextFunction) => {
    Will.find()
        .exec()
        .then((wills) => {
            return res.status(200).json({
                wills: wills,
                count: wills.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getTestatorWills = (req: Request, res: Response, next: NextFunction) => {
    Will.find(
        { 'testatorWallet': req.params['wallet'] }
    ).exec()
        .then((wills) => {
            return res.status(200).json({
                wills: wills,
                count: wills.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
}

const getWalletBalance = async (req: Request, res: Response, next: NextFunction) => {
    const balance = await bcHandler.getWalletBalance(req.params['wallet']);

    return res.status(200).json({
        balance: balance
    })
}

export default { createWill, getAllWills, getTestatorWills, getWalletBalance };