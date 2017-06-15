/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 15.06.17
 */

'use strict';
import {EventEmitter} from 'events';

export default class EventManager extends EventEmitter {

    private static _instance: EventManager;

    private constructor() {
        super();
    }

    public static instance(): EventManager {
        if (!EventManager._instance) {
            EventManager._instance = new EventManager();
        }

        return EventManager._instance;
    }
}