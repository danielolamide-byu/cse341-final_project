




const Joi = require('joi');
// const joi = require('joi');

const registrationValidator = (data) => {
    const schema = Joi.object({
        date: Joi.string() //format('YYYY-MM-DD')
            .required(),
        description: Joi.string()
            .required(),
        purpose: Joi.string()
            .required(),
        registrationAmount: Joi.number()
            .required()
        
    })
    return schema.validate(data);
};

module.exports.registrationValidator = registrationValidator;