const request = require('supertest');
const app = require('../../src/index');
const NFTService = require('../../src/services/nftService');

jest.mock('../../src/services/nftService');

describe('GET /api/nfts', () => {
    it('should return a list of NFTs', async () => {
        const mockNfts = [{
            id: 1,
            title: 'NFT 1'
        }, {
            id: 2,
            title: 'NFT 2'
        }];
        NFTService.getAllNfts.mockResolvedValue(mockNfts);

        const res = await request(app).get('/api/nfts');

        expect(res.body.success).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual(mockNfts);
    });

    it('should handle errors from NFTService', async () => {
        NFTService.getAllNfts.mockRejectedValue(new Error('Something went wrong'));

        const res = await request(app).get('/api/nfts');

        expect(res.body.success).toBe(false);
        expect(res.body.error.code).toBe(500);
        expect(res.body.error.message).toBe('Something went wrong');
    });
});

describe('GET /api/nfts/:id', () => {
    it('should return an NFT by ID', async () => {
        const mockNft = {
            id: 1,
            title: 'NFT 1'
        };
        NFTService.getNftById.mockResolvedValue(mockNft);

        const res = await request(app).get('/api/nfts/1');

        expect(res.body.success).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual(mockNft);
    });

    it('should return 404 if NFT not found', async () => {
        NFTService.getNftById.mockResolvedValue(null);

        const res = await request(app).get('/api/nfts/999');

        expect(res.body.success).toBe(false);
        expect(res.body.error.code).toBe(404);
        expect(res.body.error.message).toBe('NFT not found');
    });

    it('should handle errors from NFTService', async () => {
        NFTService.getNftById.mockRejectedValue(new Error('Something went wrong'));

        const res = await request(app).get('/api/nfts/1');

        expect(res.body.success).toBe(false);
        expect(res.body.error.code).toBe(500);
        expect(res.body.error.message).toBe('Something went wrong');
    });
});

describe('POST /api/nfts', () => {
    it('should create an NFT', async () => {
        const mockNft = {
            id: 1,
            title: 'NFT 1',
            price: 100,
            currency: "usd",
            price: 100,
            image: 'https://adnantasdemir.online/nftImage.png',
            type: 'image'
        };
        NFTService.createNft.mockResolvedValue(mockNft);

        const res = await request(app).post('/api/nfts').send({
            id: 1,
            title: 'NFT 1',
            price: 100,
            currency: "usd",
            image: 'https://adnantasdemir.online/nftImage.png',
            type: 'image'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual(mockNft);
    });

    it('should handle validation errors', async () => {
        const res = await request(app).post('/api/nfts').send({});

        expect(res.body.success).toBe(false);
        expect(res.body.error.code).toBe(400);
        expect(res.body.error.message).toBe('Validation failed');
    });

    it('should handle errors from NFTService', async () => {
        NFTService.createNft.mockRejectedValue(new Error('Something went wrong'));
        const res = await request(app).post('/api/nfts').send({
            id: 1,
            title: 'NFT 1',
            price: 100,
            currency: "usd",
            image: 'https://adnantasdemir.online/nftImage.png',
            type: 'image'
        });

        expect(res.body.success).toBe(false);
        expect(res.body.error.code).toBe(500);
        expect(res.body.error.message).toBe('Something went wrong');
    });
});

describe('PUT /api/nfts/:id', () => {
    it('should update an NFT', async () => {
        const mockNft = {
            id: 1,
            title: 'NFT 1',
            price: 100,
            currency: "usd",
            image: 'https://adnantasdemir.online/nftImage.png',
            type: 'image'
        };
        NFTService.updateNft.mockResolvedValue(mockNft);

        const res = await request(app).put('/api/nfts/1').send({
            title: 'NFT 1',
            price: 100,
            currency: "usd",
            image: 'https://adnantasdemir.online/nftImage.png',
            type: 'image'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual(mockNft);
    });

    it('should return 404 if NFT not found', async () => {
        NFTService.updateNft.mockResolvedValue(null);

        const res = await request(app).put('/api/nfts/999').send({
            title: 'NFT 1',
            price: 100,
            currency: "usd",
            image: 'https://adnantasdemir.online/nftImage.png',
            type: 'image'
        });

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.error.code).toBe(404);
        expect(res.body.error.message).toBe('NFT not found');
    });

    it('should handle errors from NFTService', async () => {
        NFTService.updateNft.mockRejectedValue(new Error('Something went wrong'));

        const res = await request(app).put('/api/nfts/1').send({
            title: 'NFT 1',
            price: 23,
            currency: "usd",
            image: 'https://adnantasdemir.online/nftImage.png',
            type: 'image'
        });

        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
        expect(res.body.error.code).toBe(500);
        expect(res.body.error.message).toBe('Something went wrong');
    });

    it('should hundle validation error  when updating an NFT', async () => {
        const mockNft = {
            id: 1,
            title: 'NFT 1',
            price: 100,
            currency: "usd",
            price: 100,
            image: 'https://adnantasdemir.online/nftImage.png',
            type: 'image'
        };
        NFTService.updateNft.mockResolvedValue(mockNft);

        const res = await request(app).put('/api/nfts/1').send({
            title: 'NFT 1',
            price: "asdd",
            currency: "usd",
            image: 'https://adnantasdemir.online/nftImage.png',
            type: 'image'
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.error.code).toBe(400);
        expect(res.body.error.message).toBe('Validation failed');
    });
});

describe('DELETE /api/nfts/:id', () => {
    it('should delete an NFT', async () => {
        NFTService.deleteNft.mockResolvedValue(true);

        const res = await request(app).delete('/api/nfts/1');

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('should return 404 if NFT not found', async () => {
        NFTService.deleteNft.mockResolvedValue(false);

        const res = await request(app).delete('/api/nfts/999');

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.error.code).toBe(404);
        expect(res.body.error.message).toBe('NFT not found');
    });

    it('should handle errors from NFTService', async () => {
        NFTService.deleteNft.mockRejectedValue(new Error('Something went wrong'));

        const res = await request(app).delete('/api/nfts/1');

        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
        expect(res.body.error.code).toBe(500);
        expect(res.body.error.message).toBe('Something went wrong');
    });
});
