import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class LoggingMiddleWare implements NestMiddleware {

    constructor(private logger: Logger) { }

    use(req: Request, res: Response, next: NextFunction) {
        if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
            fs.mkdirSync(path.join(__dirname, '..', '..', 'logs'));
        }
        const reqTime = new Date().getTime();
        res.on('finish', () => {
            const resTime = new Date().getTime();
            const log = `${req.method} ${req.originalUrl} - Code:${res.statusCode} - ${resTime - reqTime} ms \n`
            this.logger.log(
                log
            )
            const logFilePath = path.join(__dirname, '../../logs/access.log');
            fs.appendFileSync(logFilePath, log, 'utf8');
        })
        next();
    }
}

