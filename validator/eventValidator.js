


const Joi = require('joi');
// const joi = require('joi');

const eventValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .required(),
        location: Joi.string()
            .required(),
        description: Joi.string()
            .required(),
        ticketCost: Joi.number()
            .required(),
        capacity: Joi.number()
            .required()
        
    })
    return schema.validate(data);
};

module.exports.eventValidator = eventValidator;