const sendError = (status, resultObj, res, error) => {
    const obj = resultObj;
    obj.status = status;
    obj.data = {
        error,
    };
    res.status(status).json(resultObj);
};

export default sendError;
