export default (req, res) => {
    const status = 404;
    const result = {
        status,
        data: {
            message: 'The requested endpoint doesn\'t exist',
        },
    };
    res.status(status).json(result);
};
