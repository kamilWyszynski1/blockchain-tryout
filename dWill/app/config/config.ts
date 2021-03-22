import dotenv from 'dotenv';
const { abi } = require('../../blockchain/build/contracts/Will.json');

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'mongoadmin';
const MONGO_PASSWORD = process.env.MONGO_USERNAME || 'mongoadmin';
const MONGO_HOST = process.env.MONGO_URL || `localhost`;

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 27017;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

// solidity app connection
const BC_SERVER_HOSTNAME = process.env.BC_SERVER_HOSTNAME || '127.0.0.1';
const BC_SERVER_PORT = process.env.BC_SERVER_PORT || 8545;

const BLOCKCHAIN = {
    hostname: BC_SERVER_HOSTNAME,
    port: BC_SERVER_PORT,
    url: `http://${BC_SERVER_HOSTNAME}:${BC_SERVER_PORT}`,
    willContractAddress: "0xe24Fa2052E5ba370d629fa100EE273e0CD219FcB",
    abi: abi,
}

const JOBS = {
    deadlinedWillsSleep: 1800000 // miliseconds
}

const config = {
    mongo: MONGO,
    server: SERVER,
    blockchain: BLOCKCHAIN,
    jobs: JOBS
};

export default config;