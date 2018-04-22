const Joi = require('joi');

module.exports = class Validator {
    constructor() {
        let idRule = Joi.string().regex(/\w+/);
        this.schema = Joi.object().keys({
            className: Joi.string().regex(/[A-Za-z]+/),
            roster: [idRule, Joi.array().items(idRule)],
            pick: [idRule, Joi.array().items(idRule)]
        });
    }

    check(toValidate) {
        return Joi.validate(toValidate, this.schema);
    }
};