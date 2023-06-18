const auth = (req, res, next) => {
    if (!req.session.user) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        next(error);
    } 

    const { id } = req.body;

    if (id !== req.session.user.id) {
        const error = new Error('Request ID does not match ID associated with session');
        error.statusCode = 401;
        next(error);
    }

    next();
}

module.exports = auth;