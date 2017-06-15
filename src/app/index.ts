/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';

import * as Koa from 'koa';

import MainModule from './modules/main/module';
import CSVParserModule from './modules/csv-parser/module';
import DbModule from './modules/db/module';
import UserModule from './modules/user/module';

const app = new Koa();

const db = new DbModule();
const user = new UserModule();
const csv = new CSVParserModule();
const main = new MainModule([db, csv, user]);

main.register(app);

module.exports = main.app;