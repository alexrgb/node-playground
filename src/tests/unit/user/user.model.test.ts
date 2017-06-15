/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 15.06.17
 */

'use strict';
import UserModel from '../../../app/modules/user/models/user';
import User from '../../../app/modules/user/models/user';

import * as mongoose from 'mongoose';
import {Mockgoose} from 'mockgoose';

const expect = require('chai').expect,
    mockgoose = new Mockgoose(mongoose),
    dbUri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@db:27017/${process.env.MONGODB_DATABASE}`;

describe('Test user mongoose model validation', function () {
    let user: any;

    before(done => {
        user = new UserModel();
        done();
    })

    it('should be invalid if email is empty', (done: any) => {
        user.validate((err: any) => {
            expect(err).to.exist;

            if (err) {
                expect(err.errors).to.exist;

                if (err.errors) {
                    expect(err.errors.email).to.exist;
                }
            }
            done();
        });
    });
});

describe('Test user model presave', function () {
    before(async () => {
        if (mongoose.connection.readyState) {
            await mongoose.connection.close();
        }

        if (!mockgoose.helper.isMocked()) {
            throw new Error('Mongoose is not mocked');
        }

        await mockgoose.prepareStorage();

        mongoose.connect(dbUri);

        return true;
    });

    after(done => {
        if (mockgoose.helper.isMocked()) {
            mockgoose.helper.reset().then(() => mongoose.connection.close(() => done()));
        } else done();
    });

    it('should set created and updated date on user model save', async () => {

        if (!mockgoose.helper.isMocked()) {
            throw new Error('Mongoose not mocked');
        }

        let user = new User();

        user.populate({
            name: 'Test',
            surname: 'Test',
            email: 'email@email.com'
        });

        await user.save();

    });
});