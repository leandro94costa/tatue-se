const clientController = require('../../controller/client');
const clientModel = require('../../models/Client');
const newClient = require('../mocks/new/client.json');
const insertedClient = require('../mocks/inserted/client.json');
const insertedUser = require('../mocks/inserted/user.json');
const httpMocks = require('node-mocks-http');

const saveMock = jest.fn();
clientModel.prototype.save = saveMock;
clientModel.find = jest.fn();
clientModel.findById = jest.fn();
clientModel.findOne = jest.fn();
clientModel.findOneAndUpdate = jest.fn();
clientModel.deleteOne = jest.fn();

const errorMessage = { message: 'Error, something went wrong!' }
const rejectedPromiseWithErrorMessage = Promise.reject(errorMessage);

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('clientController.save', () => {
    beforeEach(() => {
        req.user = {};
        req.user.id = insertedUser._id;
        jest.resetAllMocks();
    });
    
    it('should have a save function', () => {
        expect(typeof clientController.save).toBe('function');
    });

    it('should update client if it already exists', async () => {
        req.body = newClient;
        clientModel.findOne.mockReturnValue(insertedClient);
        clientModel.findOneAndUpdate.mockReturnValue(insertedClient);

        await clientController.save(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedClient._doc);
        expect(clientModel.findOneAndUpdate).toHaveBeenCalled();
    });

    it('should create client if it doenst exists', async () => {
        req.body = newClient;
        clientModel.findOne.mockReturnValue(undefined);
        saveMock.mockReturnValue(insertedClient);
        
        await clientController.save(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedClient._doc);
        expect(saveMock).toHaveBeenCalled();
    });

    it('should handle error upon occurring', async () => {
        await clientController.save(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});

describe('clientController.getAll', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should contain a getAll function', () => {
        expect(typeof clientController.getAll).toBe('function');
    });

    it('should retrieve all clients if there is any', async () => {
        clientModel.find.mockReturnValue(insertedClient._doc);

        await clientController.getAll(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(insertedClient._doc);
    });

    it('should not retrieve clients if there isnt', async () => {
        await clientController.getAll(req, res, next);

        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should handle errors', async () => {
		clientModel.find.mockReturnValue(rejectedPromiseWithErrorMessage);

		await clientController.getAll(req, res, next);

		expect(next).toBeCalledWith(errorMessage);
	});
});

describe('clientController.getOne', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should contain a getOne function', () => {
        expect(typeof clientController.getOne).toBe('function');
    });

    it('should call findById with requested id', async () => {
        const clientId = insertedClient._doc._id;
        req.params.id = clientId;

        await clientController.getOne(req, res, next);

        expect(clientModel.findById).toBeCalledWith(clientId);
    });

    it('should return requested client if id matches', async () => {
        clientModel.findById.mockReturnValue(insertedClient);

        await clientController.getOne(req, res, next);

        expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual(insertedClient._doc);
    });

    it('shouldnt return any client if there isnt a match', async () => {
        await clientController.getOne(req, res, next);

        expect(res.statusCode).toBe(404);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({});
    });

    it('should handle errors', async () => {
		clientModel.findById.mockReturnValue(rejectedPromiseWithErrorMessage);

		await clientController.getOne(req, res, next);

		expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe('clientController.deleteOne', () => {
    const userId = insertedClient._doc.user;

    beforeEach(() => {
        req.user = {};
        req.user.id = userId;
        jest.resetAllMocks();
    });

    it('should contain a deleteOne function', () => {
        expect(typeof clientController.deleteOne).toBe('function');
    });

    it('should call deleteOne on clientModel with the userId', async () => {
        await clientController.deleteOne(req, res, next);

        expect(clientModel.deleteOne).toBeCalledWith({ 'user': userId });
    });

    it('should return HTTP 200 if it was deleted', async () => {
        clientModel.deleteOne.mockReturnValue({ deletedCount: 1 });

        await clientController.deleteOne(req, res, next);

        expect(res.statusCode).toBe(200);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({});
    });

    it('should return HTTP 404 if it wasnt deleted', async () => {
        clientModel.deleteOne.mockReturnValue({ deletedCount: 0 });

        await clientController.deleteOne(req, res, next);

        expect(res.statusCode).toBe(404);
		expect(res._isEndCalled()).toBeTruthy();
		expect(res._getJSONData()).toStrictEqual({});
    });

    it('should handle errors', async () => {
		clientModel.deleteOne.mockReturnValue(rejectedPromiseWithErrorMessage);

		await clientController.deleteOne(req, res, next);

		expect(next).toHaveBeenCalledWith(errorMessage);
    });
});