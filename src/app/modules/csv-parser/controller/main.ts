/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 13.06.17
 */

'use strict';
import * as fs from 'fs';
import {EventEmitter} from 'events';
import CSVParser from '../helpers/parser';
const csv = require('fast-csv');

export default class MainController {

    private static view: string = '/usr/src/app/modules/csv-parser/views';

    private static emitter: EventEmitter = new EventEmitter();

    /**
     * Import action
     * @url api/{version: v1}/csv/import
     * @param ctx
     * @param next
     * @return {Promise<void>}
     */
    public async importAction(ctx: any, next: any): Promise<void> {

        if (ctx.request.body.files) {
            let file = ctx.request.body.files.csv;

            let stream = fs.createReadStream(file.path);

            let csvStream = csv()
                .on('data', (data: any) => {
                    let formated = CSVParser.parse(data);

                    MainController.emitter.emit('db.input', formated);
                })
                .on('error', (err: Error) => {
                    ctx.throw(500, 'Import error: ' + err.toString());
                })
                .on('end', () => {
                    fs.unlink(file.path);
                    console.log( 'end' );
                });

            stream.pipe(csvStream);
            ctx.body = 'Success';


        } else {
            let path = `${MainController.view}/form`;

            ctx.render(path);
        }
    }


    /**
     * View data action
     * @param ctx
     * @param next
     * @return {Promise<void>}
     */
    public async viewAction(ctx: any, next: any): Promise<void> {
        let path = `${MainController.view}/view`;

        ctx.render(path);
    }
}