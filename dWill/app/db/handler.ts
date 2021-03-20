import dbClient from "./connection";
import * as mongo from 'mongodb';
import { Will } from '../models/will';


class Handler {
    sess: mongo.MongoClient

    constructor(_db: mongo.MongoClient) {
        this.sess = _db
    }

    public disconnect() {
        this.sess.close();
    }

    public async insert(will: Will) {
        const database = this.sess.db("dWill");
        const wills = database.collection("will");

        const doc = will.toDoc();
        try {
            const result = await wills.insertOne(doc);
            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }
}

export default new Handler(dbClient)