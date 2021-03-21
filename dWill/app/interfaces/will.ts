import { Document } from 'mongoose';

interface Person {
    name: string
    surname: string
    wallet: string
    email: string
}

export default interface IWill extends Document {
    testator: Person
    heir: Person
    nextPingDeadline: Number
}