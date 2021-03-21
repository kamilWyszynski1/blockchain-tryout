import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IWill from '../interfaces/will';

var WillSchema: Schema = new Schema(
    {
        testatorName: { type: String, required: true },
        testatorSurname: { type: String, required: true },
        testatorWallet: { type: String, required: true },
        testatorEmail: { type: String, required: true },
        heirName: { type: String, required: true },
        heirSurname: { type: String, required: true },
        heirWallet: { type: String, required: true },
        heirEmail: { type: String, required: true },
        nextPingDeadline: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

WillSchema.on('index', function (err) {
    if (err) {
        console.error('User index error: %s', err);
    } else {
        console.info('User indexing complete');
    }
});

WillSchema.index({ testatorWallet: 1, heirWallet: -1 }, { unique: true });

WillSchema.post<IWill>('save', function () {
    logging.info('Mongo', 'Checkout the will we just saved: ', this);
});

export default mongoose.model<IWill>('Will', WillSchema);