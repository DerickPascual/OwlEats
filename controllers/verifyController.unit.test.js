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

    test('No phone in req body', async () => {
        const req = {
            body: {}
        };
        const res = {};

        const error = new Error('Invalid phone number');
        error.statusCode = 400;

        await expect(handleVerify(req, res)).rejects.toStrictEqual(error);
    });

    test('Invalid phone in req body', async () => {
        const req = {
            body: { phoneNumber: 'abcdefg' }
        };
        const res = {};

        const error = new Error('Invalid phone number');
        error.statusCode = 400;

        await expect(handleVerify(req, res)).rejects.toStrictEqual(error);
    });

    test('No verificationCode in body', async () => {
        const req = {
            body: { phoneNumber: '+12065550100' }
        };
        const res = {};

        const error = new Error('Invalid verification code');
        error.statusCode = 400;

        await expect(handleVerify(req, res)).rejects.toStrictEqual(error);
    });

    test('checkVerificationText does not return approved', async () => {
        const req = {
            body: { phoneNumber: '+12065550100', verificationCode: '123' }
        };
        const res = {};

        checkVerificationText.mockResolvedValue('pending');

        const error = new Error('Invalid verification code');
        error.statusCode = 400;

        await expect(handleVerify(req, res)).rejects.toStrictEqual(error);
    });

    test('Phone number already registered', async () => {
        const req = {
            body: { phoneNumber: '+12065550100', verificationCode: '123' }
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
            body: { phoneNumber: '+12065550100', verificationCode: '123' },
            session: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            redirect: jest.fn()
        };

        checkVerificationText.mockResolvedValue('approved');

        fetchUserByPhone.mockResolvedValue(undefined);

        insertUser.mockResolvedValue(req.body);

        await handleVerify(req, res);

        expect(req.session.user).toStrictEqual(req.body);
        expect(req.session.inVerification).toStrictEqual(false);
        expect(res.status).toHaveBeenCalledWith(302);
        expect(res.redirect).toHaveBeenCalledWith('/settings');
    });
});