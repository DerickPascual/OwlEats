const auth = require('./auth');

const next = jest.fn();

test('Session.user not in req', () => {
    const req = {
        session: {}
    };

    const res = {};

    const error = new Error('Unauthorized');
    error.statusCode = 401;

    auth(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
});

test('Id does not equal session id', () => {
    const req = {
        body: { id: '123' },
        session: { user: { id: '321'} }
    };

    const res = {};

    const error = new Error('Request ID does not match ID associated with session');
    error.statusCode = 401;

    auth(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
});

test('Valid case', () => {
    const req = {
        body: { id: '123' },
        session: { user: { id: '123'} }
    };

    const res = {};

    auth(req, res, next);

    expect(next).toHaveBeenCalledWith();
});

