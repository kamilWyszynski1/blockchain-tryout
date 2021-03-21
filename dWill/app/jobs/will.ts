import Will from '../models/will';
import logging from '../config/logging';

const NAMESPACE = "WILL_JOB";

export default function () {
    Will.find({
        nextPingDeadline: {
            $lte: new Date().getTime()
        }
    })
        .exec()
        .then((wills) => {
            logging.debug(NAMESPACE, "wills queried", wills)
        })
        .catch((error) => {
            logging.error(NAMESPACE, "wills queried", error)
        })
}