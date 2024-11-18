
const {sequelize} = require('../../src/models');
const {NFT} = require('../../src/models');
const request = require('supertest');
const app = require('../../src/index');

describe('NFT Controller Tests', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should update an NFT via controller', async () => {
        const nft = await NFT.create({
            title: 'Old NFT',
            price: 100,
            currency: 'usd',
            image: 'https://example.com/nft.png',
            type: 'image',
        });

        const updateData = {
            title: 'Updated NFT',
            price: 300,
            currency: 'usd',
            image: 'https://example.com/updated_nft.png',
            type: 'image',
        };

        const res = await request(app).put(`/api/nfts/${nft.id}`).send(updateData);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('should create an NFT via controller', async () => {
        const nftData = {
            title: 'created NFT',
            price: 300,
            currency: 'usd',
            image: 'https://example.com/updated_nft.png',
            type: 'image',
        };

        const res = await request(app).post('/api/nfts').send(nftData);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.title).toBe(nftData.title);
    });

    it('should delete an NFT via controller', async () => {
        const nft = await NFT.create({
            title: 'NFT to Delete',
            price: 300,
            currency: 'usd',
            image: 'https://example.com/nft.png',
            type: 'image',
        });

        const res = await request(app).delete(`/api/nfts/${nft.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        const foundNft = await NFT.findOne({ where: { id: nft.id } });
        expect(foundNft).toBeNull();
    });


    it('should return an NFT by ID via controller', async () => {
        const nft = await NFT.create({
            title: 'Test NFT',
            price: 100,
            currency: 'usd',
            image: 'https://example.com/nft.png',
            type: 'image',
        });

        const res = await request(app).get(`/api/nfts/${nft.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.title).toBe(nft.title);
    });
});
