/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';
import {MiddlewareFunc} from '../main/declarations';
import {mongoMiddleware} from './middlewares/mongo';

export default class DbModule {
    public routable: boolean = false;
    public haveMiddlewares: boolean = true;

    private _middlewares: MiddlewareFunc[];

    public set middlewares(middlewares: MiddlewareFunc[]) {
        this._middlewares = middlewares;
    }

    public get middlewares(): MiddlewareFunc[] {
        return this._middlewares;
    }

    /**
     * class constructor
     * @param middlewares
     */
    public constructor(middlewares?: MiddlewareFunc[]) {
        this.middlewares = middlewares ? middlewares : DbModule.getDefaultMiddlewares();
    }

    /**
     * Default db middlewares for export
     * @return {[{middleware: ((config:ConnectionConfig)=>(ctx:any, next:Function)=>Promise<undefined>), params: {dbUri: string}}]}
     */
    private static getDefaultMiddlewares(): MiddlewareFunc[] {
        return [
            {
                middleware: mongoMiddleware,
                params: {
                    dbUri: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@db:27017/${process.env.MONGODB_DATABASE}`
                }
            }
        ];
    }
}