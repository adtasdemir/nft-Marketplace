const BaseRepository = require('./BaseRepository');
const { NFT } = require('../models');
const { Op } = require('sequelize');

class NFTRepository extends BaseRepository {
  static async getAll(queryParams) {
    try {
      const { type, minPrice, maxPrice, sortBy, order, page = 1, perPage = 10} = queryParams;

      const where = {};

      if (type) where.type = type;
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price[Op.gte] = minPrice;
        if (maxPrice) where.price[Op.lte] = maxPrice; 
      }

      const sortField = sortBy || 'id';

      const sortOrder = order || 'DESC';

      const paginationPage = parseInt(page);
      const paginationPerPage = parseInt(perPage);

      const offset = (paginationPage - 1) * paginationPerPage;

      const totalItems = await NFT.count({ where });

      const results = await NFT.findAll({
        where,
        order: [[sortField, sortOrder]],
        limit: paginationPerPage,
        offset: offset,
      });

      const totalPages = Math.ceil(totalItems / paginationPerPage);

      const links = {
        current: paginationPage,
        totalPages: totalPages,
        perPage: paginationPerPage,
        totalItems: totalItems,
        next: paginationPage < totalPages ? paginationPage + 1 : null,
        previous: paginationPage > 1 ? paginationPage - 1 : null,
      };

      return {
        items:results,
        pagination: links
      };

    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      return await NFT.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  static async create(nftData) {
    try {
      return await NFT.create(nftData);
    } catch (error) {
      throw error;
    }
  }

  static async update(id, nftData) {
    try {
      const nft = await NFT.findByPk(id);
      if (!nft) throw new Error('NFT not found');
      return await nft.update(nftData);
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const nft = await NFT.findByPk(id);
      if (!nft) throw new Error('NFT not found');
      return await nft.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NFTRepository;
