const {Board}  = require("../models/Board");

class BoardService {
 
  static async get(queryOptions) {
    const boards = await Board.find(queryOptions).exec();
    return boards;
  }

  static async getById(id) {
    const board = await Board.findById(id).exec();
    return board;
  }

  static async create(data) {
    const board = await Board.create(data);
    return board;
  }

  static async update(id, data) {
    const board = await Board.findByIdAndUpdate(id, data);
    return await board.save();
  }

  static async delete(id) {
    const board = await Board.findByIdAndDelete(id);
    return board;
  }
}

module.exports = BoardService
