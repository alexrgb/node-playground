/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 15.06.17
 */

'use strict';
import {ConnectionConfig} from '../config/declarations';

/**
 * Middleware for mongo db
 * @param config
 * @return {(ctx:any, next:Function)=>Promise<undefined>}
 */
export function mongoMiddleware(config: ConnectionConfig) {
    const mongoose = require('mongoose');
    const dbUri = config.dbUri;

    mongoose.Promise = require('bluebird');

    return async (ctx: any, next: Function) => {

        if (!mongoose.connection) {
            const connection = mongoose.connection;

            connection.on('connected', function () {
                console.log('Mongoose default connection open to ' + dbUri);
            });

            connection.on('error', function (err: Error) {
                console.log('Mongoose default connection error: ' + err);
            });

            connection.on('disconnected', function () {
                console.log('Mongoose default connection disconnected');
            });

            process.on('SIGINT', function () {
                connection.close(function () {
                    console.log('Mongoose default connection disconnected through app termination');
                    process.exit(0);
                });
            });

            mongoose.connect(dbUri);
            console.log('start connection to mongoose');
        }

        next();
    };
}