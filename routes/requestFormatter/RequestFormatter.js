const DateFormatter = require('../requestFormatter/DateFormatter');

/** Formats the request body as necessary
 * e.g timestamps - for deadlines etc.
 */

module.exports = RequestFormatter = {
    createObject: function(newObject, req) {
        Object.entries(req.body).forEach(function (keyValuePair) {
            switch (keyValuePair[0]) {
                case 'deadline':
                case 'startTs':
                case 'endTs':
                    newObject[keyValuePair[0]] = DateFormatter(keyValuePair[1]);
                    break;
                default:
                    newObject[keyValuePair[0]] = keyValuePair[1];
            }
        });
    }
};
