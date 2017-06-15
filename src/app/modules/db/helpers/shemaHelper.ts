/**
 * @author Aleksey Kucherov <alex.rgb.kiev[at]gmail.com>
 * @date 15.06.17
 */

'use strict';

'use strict';
import {ConditionConfiguration} from '../config/declarations';

module.exports = {
    populateCreateUpdateTime: populateCreateUpdateTime,
    getConditionalRequire: getConditionalRequire,
    getConditionalBoolean: getConditionalBoolean,
};

/**
 * Exported
 * Populates create and update time of model in Schema
 * @param next
 */
function populateCreateUpdateTime(next: Function) {
    let currentDate = new Date();

    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
}

/**
 * Exported
 * @param config
 * @returns {{validator: requireValidator, message: (string|string|string|string)}}
 */
function getConditionalRequire(config: ConditionConfiguration) {

    return {
        validator: requireValidator(config),
        message: config.msg || ''
    };
}

/**
 * Exported
 * @param config
 * @returns {{validator: booleanValidator, message: (string|string|string|string)}}
 */
function getConditionalBoolean(config: ConditionConfiguration) {

    return {
        validator: booleanValidator(config),
        message: config.msg || ''
    };
}

/**
 *
 * @param config
 * @param context
 * @returns {*}
 */
function getCondition(config: ConditionConfiguration, context: any) {
    let condition;
    if (config.value instanceof Object) {
        condition = config.value.includes(context[config.conditionalField]);
    } else {
        condition = context[config.conditionalField] === config.value;
    }

    return condition;
}

function requireValidator(config: ConditionConfiguration) {

    return function (v: any) {
        let condition = getCondition(config, this);

        return !condition || (condition && (v !== null && v.length !== 0));
    };
}

function booleanValidator(config: ConditionConfiguration) {
    return function (v: any) {
        let condition = getCondition(config, this);

        return !condition || (condition && typeof(v) === 'boolean');
    };
}
