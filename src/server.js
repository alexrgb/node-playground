/**
 * @author Aleksei Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 01.05.17.
 */

'use strict';

const http = require( 'http' );
const app = require( './dist/app' );

http.createServer( app.callback() ).listen( 3000 );

console.info( `listening to ${process.env.APP_PORT} port` );