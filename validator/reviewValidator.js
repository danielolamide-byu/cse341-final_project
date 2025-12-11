






const Joi = require('joi');
// const joi = require('joi');

const reviewValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string()
        .required(),
        date: Joi.string() //format('YYYY-MM-DD')
            .required(),
        description: Joi.string()
            .required(),
        purpose: Joi.string()
            .required(),       
    })
    return schema.validate(data);
};

module.exports.reviewValidator = reviewValidator;