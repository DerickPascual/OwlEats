const { checkVerificationText } = require('../twilio/verification');
const { insertUser, fetchUserByPhone } = require('../models/users');
const { handleVerify } = require('./verifyController');

jest.mock('../twilio/verification', () => ({
    checkVerificationText: jest.fn()
}));

jest.mock('../models/users', () => ({
    insertUser: jest.fn(),
    fetchUserByPhone: jest.fn()
}));

describe('handleVerify tests', () => {
    test('No body in req', async () => {
        const req = {};
        const res = {};

        const error = new Error('Request body not found');
        error.statusCode = 400;

        await expect(handleVerify(req, res)).rejects.toStrictEqual(error);
    });

    test('No phone in req session', async () => {
        const req = {
            session: {},
            body: {}
        };
        const res = {};

        const error = new Error('Invalid phone number');
        error.statusCode = 400;

        await expect(handleVerify(req, res)).rejects.toStrictEqual(error);
    });

    test('Invalid phone in req session', async () => {
        const req = {
            session: { phoneNumber: 'abcdefg '},
            body: { }
        };
        const res = {};

        const error = new Error('Invalid phone number');
        error.statusCode = 400;

        await expect(handleVerify(req, res)).rejects.toStrictEqual(error);
    });

    test('No verificationCode in body', async () => {
        const req = {
            session: { phoneNumber: '+12065550100' },
            body: {}
        };
        const res = {};

        const error = new Error('Invalid verification code');
        error.statusCode = 400;

        await expect(handleVerify(req, res)).rejects.toStrictEqual(error);
    });

    test('checkVerificationText does not return approved', async () => {
        const req = {
            session: { phoneNumber: '+12065550100' },
            body: { verificationCode: '123' }
        };
        const res = {};

        checkVerificationText.mockResolvedValue('pending');

        const error = new Error('Invalid verification code');
        error.statusCode = 400;

        await expect(handleVerify(req, res)).rejects.toStrictEqual(error);
    });

    test('Phone number already registered', async () => {
        const req = {
            session: { phoneNumber: '+12065550100' },
            body: { verificationCode: '123' }
        };
        const res = {};

        checkVerificationText.mockResolvedValue('approved');

        fetchUserByPhone.mockResolvedValue(req.body);

        const error = new Error('Phone number already registered');
        error.statusCode = 400;

        await expect(handleVerify(req, res)).rejects.toStrictEqual(error);
    });

    test('Valid phone number, verification code', async () => {
        const req = {
            body: { verificationCode: '123' },
            session: { phoneNumber: '+12065550100'}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        checkVerificationText.mockResolvedValue('approved');

        fetchUserByPhone.mockResolvedValue(undefined);

        insertUser.mockResolvedValue(req.session);

        await handleVerify(req, res);

        expect(req.session.inVerification).toStrictEqual(false);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
});