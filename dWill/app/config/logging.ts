const INFO_COLOR = "\x1b[36m%s\x1b[0m";
const ERROR_COLOR = "\x1b[31m"

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.log(INFO_COLOR, `[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    } else {
        console.log(INFO_COLOR, `[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
    } else {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
    }
};

const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.error(ERROR_COLOR, `[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
    } else {
        console.error(ERROR_COLOR, `[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
    }
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
    } else {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
    }
};

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

export default {
    info,
    warn,
    error,
    debug
};