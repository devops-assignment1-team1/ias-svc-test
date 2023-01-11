const returnError = function returnError(res, missingVariables) {
    res.status(400);
    res.send(missingVariables);
}

const returnSuccess = function returnSuccess(res, data) {
    res.status(200);
    if (data) {
        res.send(data);
    } else {
        res.send();
    }
}

module.exports = returnError;
module.exports = returnSuccess;