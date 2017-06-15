/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';
import MainController from '../controllers/main';
import {Route} from '../../main/declarations';

const ctrl = new MainController();

export const USER_ROUTES: Route[] = [
    {
        path: '/view',
        method: 'get',
        action: ctrl.viewAction
    }
];