/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 15.06.17
 */

'use strict';

export interface UserAttributes {
    name?: string;
    surname?: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}