const { fetch, URL, calCost } = require('./index');
const axios = require('axios');

jest.mock('axios');

const data = {
    "devicelevels": [[0, 1], [1, 1.5], [2, 2], [3, 5]],
    "devices": [[0, 0], [1, 0], [2, 2], [3, 1], [4, 1]],
    "customers": [[0, "John", 15, 5], [1, "Lea", 25, 20], [2, "Sara", 5, 10], [3, "Bob", 0, 50], [4, "Eric", 10, 10]],
    "rentals": [[0, 1, [1, 0], 10], [1, 2, [2], 24], [2, 3, [3], 5], [3, 4, [2, 3], 48], [4, 1, [1, 0], 10], [5, 2, [1], 24], [6, 3, [3, 2], 5], [7, 4, [2, 3, 0], 48], [8, 0, [4], 10], [9, 0, [4], 15]]
};

const cost = { John: 23.9, Lea: 23.5, Sara: 96.16, Bob: 21.25, Eric: 15 }
describe('test fetch', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        axios.get.mockResolvedValue({ data });
        //below works too, useful for passing method arguments, or mocking more than once based on the arguments
        //axios.get.mockImplementation((url) => {
        //  return { data }
        //});
    })
    //mock multiple get mockimplementaion for customers, rentals, devices, deviceslevel
    it('should call axios.get', async () => {
        const res = await fetch(0, 15);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`${URL}/0`);
        expect(res).toEqual(cost);
    });

    it('should catch the error for negative id', async () => {
        //const res = await fetch(-1, 15);
        const res = fetch(-1, 15);
        await expect(res).rejects.toThrowError('id or minimum charge can not be negative');
        expect(axios.get).toHaveBeenCalledTimes(0);

    });
    it('should catch the error for axios.get error', async () => {
        axios.get.mockImplementation(() => {
            throw Error('network error');
        });
        await expect(fetch(0, 15)).rejects.toThrowError('network error');
        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});

describe('test cal cost', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it('should cal cost ', () => {
        //const cost = calCost(data, 15);
        expect(calCost(data, 15)).toEqual(cost);
    });
    it('should throw an exception if data is empty', () => {
        expect(() => calCost({}, 15)).toThrow();
    });
    it('should throw an exception if data is null', () => {
        expect(() => calCost(null, 15)).toThrow('data is null');
    });
});