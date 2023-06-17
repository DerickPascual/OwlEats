const { fetchUserByPhone } = require('../models/users');
const { handleLogin } = require('./loginController');

jest.mock('../models/users', () => ({
    fetchUserByPhone: jest.fn()
}));

describe('Handle login tests', () => {
    test('No req body', async () => {
        const req = {};
        const res = {};

        const error = new Error('Request body not found');
        error.statusCode = 400;

        await expect(handleLogin(req, res)).rejects.toStrictEqual(error);
    });

    test('No phone in req body', async () => {
        const req = {
            body: {}
        };
        const res = {};

        const error = new Error('Invalid phone number');
        error.statusCode = 400;

        await expect(handleLogin(req, res)).rejects.toStrictEqual(error);
    });

    test('Invalid phone in body', async () => {
        const req = {
            body: { phoneNumber: 'ABCED' }
        };
        const res = {};

        const error = new Error('Invalid phone number');
        error.statusCode = 400;

        await expect(handleLogin(req, res)).rejects.toStrictEqual(error);
    });

    test('valid phone in body but no user', async () => {
        const req = {
            body: { phoneNumber: '+12065550100'},
            session: {}
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const error = new Error('Phone number not registered');
        error.statusCode = 400;

        await expect(handleLogin(req, res)).rejects.toStrictEqual(error);
    });

    test('valid phone in body and user', async () => {
        const req = {
            body: { phoneNumber: '+12065550100'},
            session: {}
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const user = { id: '123', phoneNumber: '+12065550100'};

        fetchUserByPhone.mockResolvedValue(user);

        await handleLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(user);
        expect(req.session.user).toStrictEqual(user);
    })
});