const errorHandler = require('./errorHandler');

describe('errorHandler tests', () => {
    test('Error has error code and message', () => {
        const error = new Error('message');
        error.statusCode = 400;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const expectedRes = {
            error: {
                message: 'message'
            }
        };

        errorHandler(error, {}, res, () => {});

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expectedRes);
    });

    test('Error has no code or message', () => {
        const error = new Error();

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const expectedRes = {
            error: {
                message: 'Internal Server Error'
            }
        };

        errorHandler(error, {}, res, () => {});

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expectedRes);
    })
})