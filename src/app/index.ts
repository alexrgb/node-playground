/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';

import * as Koa from 'koa';
import * as path from 'path';

import MainModule from './modules/main/module';
import CSVParserModule from './modules/csv-parser/module';

const app = new Koa();

const csv = new CSVParserModule();
const main = new MainModule([csv]);

main.register(app);

module.exports = main.app;