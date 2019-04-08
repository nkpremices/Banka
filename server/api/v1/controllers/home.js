export default {
    /**
   * GET- / welcome message
   */
    Home: (req, res) => {
        const status = 200;
        const result = {
            status,
            data: {
                message: 'Welcome on Banka',
            },
        };
        res.status(status).json(result);
    },
};
