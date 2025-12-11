
const Joi = require('joi');

const userValidator = (userData) => {
    const userScheme = Joi.object({
        name: Joi.string()
            .required(),
        age: Joi.number()
            .required(),
        email: Joi.string()
            .required(),
        phoneNumber: Joi.number()
            .required(),
        nationality: Joi.string()
    })
    
    return userScheme.validate(userData);
};

module.exports.userValidator = userValidator;