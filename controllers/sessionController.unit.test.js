const { getUser } = require('./sessionController');
const { fetchUserById, fetchUserByPhone, updateUser, deleteUser } = require('../models/users');
const { getExpectedBodyHash } = require('twilio/lib/webhooks/webhooks');

jest.mock('../models/users', () => ({
    fetchUserById: jest.fn(),
    fetchUserByPhone: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
}));


describe('getUser tests', () => {
    test('Session has no user', () => {
        const req = {
            session: {}
        };
    
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        getUser(req, res);

        expect(res.status).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(undefined);
    })
});
