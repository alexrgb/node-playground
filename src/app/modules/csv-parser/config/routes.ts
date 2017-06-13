/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';
import {Route} from './declarations';
import MainController from '../controller/main';

const ctrl = new MainController();

export const CSV_PARSER_ROUTES: Route[] = [
    {
        path: '/import',
        method: 'get',
        action: ctrl.importAction
    },
    {
        path: '/import',
        method: 'post',
        action: ctrl.importAction
    },
    {
        path: '/view',
        method: 'get',
        action: ctrl.viewAction
    }
];