/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 15.06.17
 */

'use strict';

import {Route} from '../main/declarations';
import {USER_ROUTES} from './config/routes';
import {EventEmitter} from 'events';
import {UserAttributes} from './config/declarations';
import MainController from './controllers/main';
import EventManager from '../main/helpers/emitter';

const Router = require('koa-router');

export default class UserModule {
    public routable: boolean = true;
    public haveMiddlewares: boolean = false;

    private routerInstance: any;
    private module: string = 'user';
    private routes: Route[] = USER_ROUTES;

    private emitter: EventEmitter = EventManager.instance();

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

        this.emitter.on('user.import', async(data: UserAttributes) => {
            await UserModule.handleImport(data);
        });
    }

    public register(route: any): void {
        route.use('/' + this.id, this.routerInstance.routes());
    }

    private addRoutes(): void {
        this.routes.forEach((route: Route) => {
            this.routerInstance[route.method](route.path, route.action);
        });
    }

    private static async handleImport(data: UserAttributes): Promise<void> {
        await MainController.importAction(data);
    }
}