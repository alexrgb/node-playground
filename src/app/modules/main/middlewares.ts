/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';

import * as path from 'path';
import {MiddlewareFunc} from './declarations';

const bodyParser = require('koa-body');
const Pug = require('koa-pug');
const favicon = require('koa-favicon');

function pugMiddleware(params: any) {
    const pug = new Pug(params);

    return (ctx: any, next: Function) => {
        console.log('pug middleware registered');
        next();
    };
}

/**
 * Log request method, url and response time to console
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
async function requestMethod(ctx: any, next: any) {
    const start: number = Date.now();
    await next();
    const ms: number = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
}

/**
 * Add additional header with response time in ms
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
async function responseTime(ctx: any, next: any) {
    const start: number = Date.now();
    await next();
    const ms: number = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
}

/**
 * All middlewares
 */
export const MAIN_MIDDLEWARES: MiddlewareFunc[] = [
    {
        middleware: responseTime
    },
    {
        middleware: requestMethod
    },
    {
        middleware: bodyParser,
        params: {
            formidable: {uploadDir: __dirname + 'usr/src/uploads'},
            multipart: true,
            urlencoded: true
        }
    },
    {
        middleware: pugMiddleware,
        params: {
            viewPath: path.join(__dirname, '../'),
        },
        $inject: 'app'
    },
    {
        middleware: favicon,
        params: __dirname + 'usr/src/dist/favicon.ico'
    }
];