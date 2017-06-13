/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';
import {EventEmitter} from 'events';

export default class CSVParser {

    public static parse(data: string[]) {
        return {
            name: data[0],
            surname: data[1],
            email: data[2]
        };
    }
}