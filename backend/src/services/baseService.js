class BaseService {
    static async getAll(queryParams) {
      throw new Error('getAll method must be implemented');
    }
  
    static async getById(id) {
      throw new Error('getById method must be implemented');
    }
  
    static async create(data) {
      throw new Error('create method must be implemented');
    }
  
    static async update(id, data) {
      throw new Error('update method must be implemented');
    }
  
    static async delete(id) {
      throw new Error('delete method must be implemented');
    }
  }
  
  module.exports = BaseService;
  