const {List}  = require( "../models/List");

module.exports = class ListService {
  static async get(queryOptions) {
    const cards = List.find(queryOptions).sort('sortOrder');
    return await cards.exec();
  }

  static async getById(id){
    const board = List.findById(id);
    return await board.exec();
  }

  static async create(data) {
    const board = await List.create(data);
    return board;
  }

  static async update(id, data){
    const board = await List.findByIdAndUpdate(id, data);
    return await board.save();
  }

  static async delete(id){
    const board = await List.findByIdAndDelete(id);
    return board;
  }
}
