export const handleErrors = error => {
    var msg = Object.values(error).map(function(value) {
        return value;
    });
    return window.alert(msg);
};
