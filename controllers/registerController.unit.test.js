const { handleRegister } = require('./registerController');
const { sendVerificationText } = require('../twilio/verification');
const { fetchUserByPhone } = require('../models/users');

jest.mock('../models/users', () => ({
    fetchUserByPhone: jest.fn()
}));

jest.mock('../twilio/verification', () => ({
    sendVerificationText: jest.fn()
}));

describe('handleRegisterTests', () => {
    test('Req body does not exist', async () => {
        const req = {};
        const res = {};

        const error = new Error('Request body not found');
        error.statusCode = 400;

        await expect(handleRegister(req, res)).rejects.toStrictEqual(error);
    });

    test('No phoneNumber in req body', async () => {
        const req = { body: {} };
        const res = {};

        const error = new Error('Invalid phone number');
        error.statusCode = 400;

        await expect(handleRegister(req, res)).rejects.toStrictEqual(error);
    });

    test('Invalid phoneNumber in req body', async () => {
        const req = { body: { phoneNumber: '123' } };
        const res = {};

        const error = new Error('Invalid phone number');
        error.statusCode = 400;

        await expect(handleRegister(req, res)).rejects.toStrictEqual(error);
    });

    test('Phone number already registered', async () => {
        const req = { body: { phoneNumber: '+12065550100' } };
        const res = {};

        fetchUserByPhone.mockResolvedValue({ id: '123' });

        const error = new Error('Phone number already registered');
        error.statusCode = 409;

        await expect(handleRegister(req, res)).rejects.toStrictEqual(error);
    });

    test('Valid phone number not already registered', async () => {
        const req = { 
            body: { phoneNumber: '+12065550100' },
            session: {} 
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        fetchUserByPhone.mockResolvedValue(undefined)
        await handleRegister(req, res);

        expect(sendVerificationText).toHaveBeenCalledWith(req.body.phoneNumber);
        expect(req.session.inVerification).toBe(true);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    })
})