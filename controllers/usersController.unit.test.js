const { updateUserSettings, deleteUserById } = require('./usersController');
const { fetchUserById, fetchUserByPhone, updateUser, deleteUser } = require('../models/users');

jest.mock('../models/users', () => ({
    fetchUserById: jest.fn(),
    fetchUserByPhone: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
}));

describe('updateUserSettings tests', () => {
    describe('Tests not containing all inputs', () => {
        test('No servery, allergens, diets array', async () => {
            const req = {
                body: { id: '123', phoneNumber: '123' }
            };

            const res = {};

            const error = new Error('All inputs are required');
            error.statusCode = 400;

            await expect(updateUserSettings(req, res)).rejects.toStrictEqual(error);
        });
    });

    describe('Tests containing all inputs but one invalid', () => {
        test('Invalid serveries test', async () => {
            const req = {
                body: {
                    id: '123',
                    phoneNumber: '+12065550100',
                    serveries: ['north', 'west', 'duncan'],
                    allergens: [],
                    diets: []
                }
            };

            const res = {};

            const error = new Error('Invalid value in serveries array');
            error.statusCode = 400;

            await expect(updateUserSettings(req, res)).rejects.toStrictEqual(error);
        });

        test('Invalid allergens test', async () => {
            const req = {
                body: {
                    id: '123',
                    phoneNumber: '+12065550100',
                    serveries: ['north', 'west'],
                    allergens: ['south'],
                    diets: []
                }
            };

            const res = {};

            const error = new Error('Invalid value in allergens array');
            error.statusCode = 400;

            await expect(updateUserSettings(req, res)).rejects.toStrictEqual(error);
        });

        test('Invalid diets test', async () => {
            const req = {
                body: {
                    id: '123',
                    phoneNumber: '+12065550100',
                    serveries: ['north', 'west'],
                    allergens: [],
                    diets: ['meat']
                }
            };

            const res = {};

            const error = new Error('Invalid value in diets array');
            error.statusCode = 400;

            await expect(updateUserSettings(req, res)).rejects.toStrictEqual(error);
        });
    });

    describe('Valid inputs tests', () => {
        test('No user associated with id', async () => {
            const req = {
                session: {
                    user: { id: '123 '}
                },
                body: {
                    id: '123',
                    phoneNumber: '+12065550100',
                    serveries: ['north', 'west'],
                    allergens: [],
                    diets: []
                }
            };

            const res = {};

            updateUser.mockResolvedValue(undefined);

            const error = new Error('User not found');
            error.statusCode = 404;

            await expect(updateUserSettings(req, res)).rejects.toStrictEqual(error);
        });

        test('User associated with id', async () => {
            const req = {
                session: {
                    user: { id: '123 '}
                },
                body: {
                    id: '123',
                    phoneNumber: '+12065550100',
                    serveries: ['north', 'west', 'south', 'seibel', 'west'],
                    allergens: ['gluten', 'soy', 'dairy', 'eggs', 'fish', 'shellfish', 'peanuts', 'treenuts', 'sesame'],
                    diets: ['halal', 'vegan', 'vegetarian']
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            updateUser.mockResolvedValue(req.session.user);

            await updateUserSettings(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(req.session.user);
        });
    });
});

describe('deleteUser tests', () => {
    test('id not in db', async () => {
        const req = {
            session: { user: { id: '123' } }
        };

        const res = {};

        deleteUser.mockResolvedValue(undefined);

        const error = new Error('User not found');
        error.statusCode = 404;

        await expect(deleteUserById(req, res)).rejects.toStrictEqual(error);
    });

    test('id in db', async () => {
        const req = {
            session: { 
                user: { id: '123' } ,
                destroy: jest.fn()
        }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        deleteUser.mockResolvedValue(req.session.user);

        await deleteUserById(req, res);

        expect(req.session.destroy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "User deleted", user: req.session.user });
    });
});