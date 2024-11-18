const NFTService = require('../services/nftService');
const ResponseFormatter = require('../utils/ResponseFormatter');

class NFTController {
  static async getAllNfts(req, res, next) {
    try {
      const nfts = await NFTService.getAllNfts(req.query);
      return ResponseFormatter.sendSuccess(res, nfts);
    } catch (error) {
      next(error); 
    }
  }

  static async getNftById(req, res, next) {
    try {
      const nft = await NFTService.getNftById(req.params.id);
      if (!nft) {
        return ResponseFormatter.sendError(res, 'NFT not found', 404);
      }
      return ResponseFormatter.sendSuccess(res, nft);
    } catch (error) {
      next(error);
    }
  }

  static async createNft(req, res, next) {
    try {
      const nft = await NFTService.createNft(req.body);
      return ResponseFormatter.sendSuccess(res, nft);
    } catch (error) {
      next(error);
    }
  }

  static async updateNft(req, res, next) {
    try {
      const nft = await NFTService.updateNft(req.params.id, req.body);
      if (!nft) {
        return ResponseFormatter.sendError(res, 'NFT not found', 404);
      }
      return ResponseFormatter.sendSuccess(res, nft);
    } catch (error) {
      next(error);
    }
  }

  static async deleteNft(req, res, next) {
    try {
      const deleted = await NFTService.deleteNft(req.params.id);
      if (!deleted) {
        return ResponseFormatter.sendError(res, 'NFT not found', 404);
      }
      return ResponseFormatter.sendSuccess(res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NFTController;
