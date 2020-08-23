const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name: '';

    if (!validator.isLength(data.name, {min: 3, max: 40})) {
        errors.name = 'Name must be at least 3 letters long and have a maximum of 40 letters';
    }

    if (data.members && !Array.isArray(data.members)) {
        errors.members = 'Unrecognized members format - use array';
    }

    if (data.technologyStack && !Array.isArray(data.technologyStack)) {
        errors.technologyStack = 'Unrecognized terchnology stack format - use array';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
