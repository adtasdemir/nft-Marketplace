// src/services/nftService.js
const BaseService = require('./BaseService');
const NFTRepository = require('../repositories/nftRepository');

class NFTService  extends BaseService {
  static async getAllNfts(queryParams) {
    try {
      return await NFTRepository.getAll(queryParams);
    } catch (error) {
      throw error;
    }
  }

  static async getNftById(id) {
    try {
      const nft = await NFTRepository.getById(id);
      if (!nft) throw new Error('NFT not found');
      return nft;
    } catch (error) {
      throw error;
    }
  }

  static async createNft(nftData) {
    try {
      return await NFTRepository.create(nftData);
    } catch (error) {
      throw error;
    }
  }

  static async updateNft(id, nftData) {
    try {
      return await NFTRepository.update(id, nftData);
    } catch (error) {
      throw error;
    }
  }

  static async deleteNft(id) {
    try {
      return await NFTRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NFTService;
