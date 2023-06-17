const { createNewUser, getUser, updateUserSettings, deleteUserById } = require('./usersController');
const { insertUser, fetchUserById, fetchUserByPhone, updateUser, deleteUser } = require('../models/users');

jest.mock('../models/users', () => ({
    insertUser: jest.fn(),
    fetchUserById: jest.fn(),
    fetchUserByPhone: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
}));

describe('createNewUser tests', () => {
    test('req has no body', async () => {
        const req = {};
        const res = {};

        const error = new Error('Request body not found');
        error.statusCode = 400;

        await expect(createNewUser(req, res)).rejects.toStrictEqual(error);
    });


    describe('Tests with real phone number with country code', () => {
        const req = {
            body: { phoneNumber: '+12065550100' }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        test('Phone number not a duplicate', async () => {
            fetchUserByPhone.mockResolvedValue(undefined);
            insertUser.mockResolvedValue({ phoneNumber: '+12065550100' });

            await createNewUser(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ phoneNumber: '+12065550100' });
        });

        test('Phone number a duplicate', async () => {
            fetchUserByPhone.mockResolvedValue({ id: '123', phoneNumber: '+12065550100', serveries: [], allergens: [], diets: [] });

            const error = new Error('Phone number already registered');
            error.statusCode = 409;

            await expect(createNewUser(req, res)).rejects.toStrictEqual(error);
        });
    });

    test('Real phone number with no country code', async () => {
        const req = {
            body: { phoneNumber: '2065550100' }
        }

        const res = {}

        const error = new Error('Invalid phone number');
        error.statusCode = 400;

        await expect(createNewUser(req, res)).rejects.toStrictEqual(error);
    });
});

describe('getUser tests', () => {
    test('req has no body', async () => {
        const req = {};
        const res = {};

        const error = new Error('Request body not found');
        error.statusCode = 400;

        await expect(getUser(req, res)).rejects.toStrictEqual(error);
    });


    describe('Tests with only possible id in request body', () => {
        const req = {
            body: { id: '123' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        test('ID is valid and belongs to a user', async () => {
            const user = {
                id: '123',
                phoneNumber: '123',
                serveries: ['west', 'north'],
                allergens: [],
                diets: []
            }
            fetchUserById.mockResolvedValue(user);

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user);
        });

        test('ID is not valid', async () => {
            fetchUserById.mockResolvedValue(undefined);

            const error = new Error('User not found');
            error.statusCode = 404;

            await expect(getUser(req, res)).rejects.toStrictEqual(error);
        });
    });

    describe('Tests with valid phone number in request body', () => {
        const req = {
            body: { phoneNumber: '+12065550100' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        test('Phone number is in database', async () => {
            const user = {
                id: '123',
                phoneNumber: '+12065550100',
                serveries: ['west', 'north'],
                allergens: [],
                diets: []
            };

            fetchUserByPhone.mockResolvedValue(user);

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user);
        });

        test('Phone number is not in database', async () => {
            fetchUserByPhone.mockResolvedValue(undefined);

            const error = new Error('User not found');
            error.statusCode = 404;

            await expect(getUser(req, res)).rejects.toStrictEqual(error);
        });
    });

    describe('Tests with invalid arguments in request body', () => {
        test('Test with invalid id', async () => {
            const req = {
                body: { id: 'abcdefg' }
            }

            const res = {}

            const error = new Error('Invalid phone number or id');
            error.statusCode = 400;

            await expect(getUser(req, res)).rejects.toStrictEqual(error);
        });

        test('tests with invalid phone number', async () => {
            const req = {
                body: { phoneNumber: 'abcdefg' }
            };

            const res = {};

            const error = new Error('Invalid phone number or id');
            error.statusCode = 400;

            await expect(getUser(req, res)).rejects.toStrictEqual(error);
        });

        test('no id or phone number', async () => {
            const req = {
                body: {}
            };

            const res = {};

            const error = new Error('Invalid phone number or id');
            error.statusCode = 400;

            await expect(getUser(req, res)).rejects.toStrictEqual(error);
        });
    });
});

describe('updateUserSettings tests', () => {
    test('req has no body', async () => {
        const req = {};
        const res = {};

        const error = new Error('Request body not found');
        error.statusCode = 400;

        await expect(updateUserSettings(req, res)).rejects.toStrictEqual(error);
    });


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
        test('Invalid id test', async () => {
            const req = {
                body: {
                    id: 'abcdefg',
                    phoneNumber: '+12065550100',
                    serveries: ['north', 'west'],
                    allergens: [],
                    diets: []
                }
            }

            const res = {}

            const error = new Error('Invalid id');
            error.statusCode = 400;

            await expect(updateUserSettings(req, res)).rejects.toStrictEqual(error);
        });

        test('Invalid phone test', async () => {
            const req = {
                body: {
                    id: '123',
                    phoneNumber: '2065550100',
                    serveries: ['north', 'west'],
                    allergens: [],
                    diets: []
                }
            };

            const res = {};

            const error = new Error('Invalid phone number');
            error.statusCode = 400;

            await expect(updateUserSettings(req, res)).rejects.toStrictEqual(error);
        });

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

            updateUser.mockResolvedValue(req.body);

            await updateUserSettings(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(req.body);
        });
    });
});

describe('deleteUser tests', () => {
    test('req has no body', async () => {
        const req = {};
        const res = {};

        const error = new Error('Request body not found');
        error.statusCode = 400;

        await expect(deleteUserById(req, res)).rejects.toStrictEqual(error);
    });

    describe('id validity tests', () => {
        test('id not in body', async () => {
            const req = {
                body: {}
            };
            const res = {};

            const error = new Error('Invalid id');
            error.statusCode = 400;

            await expect(deleteUserById(req, res)).rejects.toStrictEqual(error);
        });

        test('id in body but invalid', async () => {
            const req = {
                body: { id: 'abcdefg' }
            };

            const res = {};
            
            const error = new Error('Invalid id');
            error.statusCode = 400;

            await expect(deleteUserById(req, res)).rejects.toStrictEqual(error);
        });
    });

    describe('tests with valid id', () => {
        test('id not in db', async () => {
            const req = {
                body: { id: '123' }
            };

            const res = {};
            
            deleteUser.mockResolvedValue(undefined);

            const error = new Error('User not found');
            error.statusCode = 404;

            await expect(deleteUserById(req, res)).rejects.toStrictEqual(error);
        });

        test('id in db', async () => {
            const req = {
                body: { id: '123' }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            
            deleteUser.mockResolvedValue(req.body);

            await deleteUserById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "User deleted", user: req.body } );
        });
    });
});