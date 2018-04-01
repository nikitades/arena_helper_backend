const Joi = require('joi');

module.exports = class Validator {
    constructor() {
        let uuidRule = Joi.number().integer();
        this.schema = Joi.object().keys({
            className: Joi.string().regex(/[A-Za-z]+/),
            roster: [uuidRule, Joi.array().items(uuidRule)],
            pick: [uuidRule, Joi.array().items(uuidRule)]
        });
    }

    check(toValidate) {
        return Joi.validate(toValidate, this.schema);
    }
};