/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 15.06.17
 */

'use strict';

export interface ConditionConfiguration {
    value: any;
    conditionalField: any;
    msg?: string;
}

export interface ConnectionConfig {
    dbUri: string;
}