/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';

const Router = require('koa-router');
import {Route} from './config/declarations';
import {CSV_PARSER_ROUTES} from './config/routes';

/**
 * Base class of csv parser module
 * @class CSVParserModule
 */
export default class CSVParserModule {
    private routerInstance: any;
    private module: string = 'csv';
    private routes: Route[] = CSV_PARSER_ROUTES;

    public get router(): any {
        return this.routerInstance;
    }

    public get id(): string {
        return this.module;
    }

    public set router(router: any) {
        this.routerInstance = router;
    }

    public constructor(router?: any) {
        this.router = router ? router : new Router();
        this.addRoutes();
    }

    public register(route: any): void {
        route.use('/' + this.id, this.routerInstance.routes());
    }

    private addRoutes(): void {
        this.routes.forEach((route: Route) => {
            this.routerInstance[route.method](route.path, route.action);
        });
    }
}