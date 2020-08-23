const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title: '';
    data.company = !isEmpty(data.company) ? data.company: '';
    data.startTs = !isEmpty(data.startTs) ? data.startTs: '';
    data.location = !isEmpty(data.location) ? data.location: '';

    if (validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }

    if (validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }

    if (validator.isEmpty(data.startTs)) {
        errors.startTs = 'From date is required';
    }

    if (validator.isEmpty(data.location)) {
        errors.location = 'From date is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
