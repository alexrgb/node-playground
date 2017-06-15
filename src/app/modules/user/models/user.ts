/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 15.06.17
 */

'use strict';
import {UserAttributes} from '../config/declarations';
import UserModel from './user.schema';

export default class User {
    private _db: any;

    private _model: any;

    public set db(db: any) {
        this._db = db;
    }

    public get db(): any {
        return this._db;
    }

    public set model(model: any) {
        this._model = model;
    }

    public get model(): any {
        return this._model;
    }

    public constructor(db?: any) {
        this.db = db ? db : UserModel;
    }

    /**
     * Search for list of models
     * @param params
     * @return {Promise<User[]>}
     */
    public async find(params?: any): Promise<User[]> {
        let result: User[] = [];

        try {
            let search: any[] = await this._db.find(params);

            search.forEach((model: any) => {
                let instance = new User(this.db);

                instance.model = model;

                result.push(instance);
            });

        } catch (e) {
            console.log(e);
        }

        return result;
    }

    /**
     * Search for one model
     * @param params
     * @return {Promise<User| null>}
     */
    public async findOne(params: any): Promise<User | null> {
        let result: User | null = null;

        try {
            let search: any = await this._db.findOne(params);

            if (search) {
                let instance = new User(this._db);
                instance.model = search;

                result = instance;
            }

        } catch (e) {
            console.log(e);
        }

        return result;
    }

    /**
     * Populates model attributes
     * @param data
     */
    public populate(data: UserAttributes): void {
        if (!this._model) {
            this._model = new (<any>this._db)(data);
        } else {
            if (data.name) {
                this._model.name = data.name;
            }

            if (data.surname) {
                this._model.surname = data.surname;
            }

            this._model.email = data.email;
        }
    }

    /**
     * Saves model to db
     * @return {Promise<boolean>}
     */
    public async save(): Promise<boolean> {
        let result: boolean = true;

        try {
            await this._model.save(() => true);

        } catch (e) {
            console.log(e);
            result = false;
        }

        return result;
    }
}