import { Request, Response, NextFunction } from "express";

const testRoute = function (req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    let { username, password } = req.body;

    console.info(`${username} ${password}`);
    return res.status(200).send()
}

export default {
    testRoute
}