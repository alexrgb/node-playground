/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';

export interface Route {
    path: string,
    method: string,
    action: any
}