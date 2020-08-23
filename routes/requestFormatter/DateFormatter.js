module.exports = function formatDateTime(value) {
    return new Date(value).toISOString();
};
