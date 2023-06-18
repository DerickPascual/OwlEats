const inputValidator = require('./inputValidator');

const next = jest.fn();

test('Request has no body', () => {
    const req = {};
    const res = {};

    const error = new Error('Request body not found');
    error.statusCode = 400;

    inputValidator(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
});

test('Request has body but no id', () => {
    const req = {
        body: {}
    };

    const res = {};

    const error = new Error('Invalid id');
    error.statusCode = 400;
    
    inputValidator(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
});

test('Request has id but invalid', () => {
    const req = {
        body: { id: '123A' }
    };

    const res = {};

    const error = new Error('Invalid id');
    error.statusCode = 400;
    
    inputValidator(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
});

test('Request has body and valid id', () => {
    const req = {
        body: { id: '123' }
    };

    const res = {};

    inputValidator(req, res, next);

    expect(next).toHaveBeenCalledWith();
});