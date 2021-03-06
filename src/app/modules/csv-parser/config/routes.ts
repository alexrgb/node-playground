/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';

import MainController from '../controllers/main';
import {Route} from '../../main/declarations';

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
    }
];