/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';

const Router = require('koa-router');
import {MiddlewareFunc} from './declarations';
import {MAIN_MIDDLEWARES} from "./middlewares";

/**
 * @class MainModule
 */
export default class MainModule {
    public corePath: string;

    private routerInstance: any;
    private module: string = 'v1';
    private allMiddlewares: MiddlewareFunc[] = [];
    private modulesInstances: any[] = [];
    private appInstanse: any;

    public get router(): any {
        return this.routerInstance;
    }

    public get id(): string {
        return this.module;
    }

    public get modules(): any[] {
        return this.modulesInstances;
    }

    public get app(): any {
        return this.appInstanse;
    }

    public set router(router: any) {
        this.routerInstance = router;
    }

    public set middlewares(middlewares: MiddlewareFunc[]) {
        this.allMiddlewares = middlewares;
    }

    public set modules(modules: any[]) {
        this.modulesInstances = modules;
    }

    public constructor(modules: any[], router?: any, middlewares?: MiddlewareFunc[]) {
        this.modules = modules;

        this.router = router ? router : new Router({prefix: '/' + this.id});

        this.middlewares = middlewares ? middlewares : MAIN_MIDDLEWARES;
    }

    public register(app: any): void {
        this.appInstanse = app;
        this.registerMiddlewares();
        this.registerRoutes();
    }

    private registerMiddlewares(): void {
        this.allMiddlewares.forEach((data: MiddlewareFunc) => {
            let params: any;
            let middleware = data.middleware;

            if (data.params) {
                params = data.params
            }

            if (data.$inject) {
                let inject = data.$inject;

                if (data.params) {
                    if (typeof inject == 'string' && inject == 'app') {
                        params = Object.assign(params, {app: this.app});
                    } else {
                        params = Object.assign(params, inject);
                    }
                } else params = inject;
            }

            !params
                ? this.app.use(middleware)
                : this.app.use(middleware(params));
        });
    }

    private registerRoutes(): void {
        this.modulesInstances.forEach((module: any) => module.register(this.routerInstance));
        this.app.use(this.routerInstance.routes());
    }
}