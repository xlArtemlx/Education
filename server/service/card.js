const {Card} = require( "../models/Card");

module.exports = class CardService {
  static async get(queryOptions) {
    const cards = Card.find(queryOptions).sort('sortOrder');
    return await cards.exec();
  }

  static async getById(id){
    const board = Card.findById(id);
    return await board.exec();
  }

  static async create(data) {
    const board = await Card.create(data);
    return board;
  }

  static async update(id, data){
    const board = await Card.findByIdAndUpdate(id, data);
    return await board.save();
  }

  static async delete(id){
    const board = await Card.findByIdAndDelete(id);
    return board;
  }
}