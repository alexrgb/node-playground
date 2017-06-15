/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 15.06.17
 */

'use strict';
import User from '../models/user';
import {UserAttributes} from '../config/declarations';

export default class MainController {

    private static view: string = '/usr/src/app/modules/user/views';

    /**
     * Routable
     * View data action
     * @param ctx
     * @param next
     * @return {Promise<void>}
     */
    public async viewAction(ctx: any, next: any): Promise<void> {

        let model = new User();

        console.log( model );

        let items = await model.find();

        let path = `${MainController.view}/view`;

        ctx.render(path, {models: items});
    }

    /**
     * Inner purpose
     * Not routable;
     * @param data
     * @return {Promise<void>}
     */
    public static async importAction(data: UserAttributes): Promise<void> {
        let model = new User();

        model.populate(data);

        await model.save();
    }
}