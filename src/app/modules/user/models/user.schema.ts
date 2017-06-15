/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 15.06.17
 */

'use strict';

let mongoose = require( 'mongoose' ),
    schemaHelper = require('../../db/helpers/shemaHelper'),
    Schema = mongoose.Schema,
    userSchema = new Schema( {
        name: { type: String, default: '' },
        surname: { type: String, default: '' },
        email: { type: String, required: true, index: true },
        createdAt: Date,
        updatedAt: Date
    }, { collection: 'users' } );

/**
 * Add holder of creation and update date of model
 */
userSchema.pre( 'save', schemaHelper.populateCreateUpdateTime );

let UserModel = mongoose.model( 'User', userSchema );

export default UserModel;