const {Router} = require('express')
const {_}  = require( "lodash")
const BoardService  = require( "../service/board");
const ListService  = require("../service/list");
const {Container} =  require ("typedi")
const CardService = require("../service/card");
const router = Router()


router.get("/boards", async (req, res) => {
    const boardService = Container.get(BoardService);
    const boards = await boardService.get().catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(boards);
});

router.get("/board/:boardId", async (req, res) => {
    const boardService = Container.get(BoardService);
    const cardService = Container.get(CardService);
    const listService = Container.get(ListService);

    const { boardId } = req.params;

    const board = await boardService.getById(boardId);
    const list = await listService.get({ boardId });
    const cards = await cardService.get({
      listId: { $in: list.map(l => l._id) }
    });

    const listsWithCards = list.map(list => {
      return {
        ...list.toObject(),
        cards: [...cards].filter(c => {
          return c.listId === list._id.toString();
        })
      };
    });

    const response = {
      ...board.toObject(),
      lists: listsWithCards
    };

    return res.status(200).json(response);
  });

router.get("/board/:boardId/lists", async (req, res) => {
    const listService = Container.get(ListService);
    const { boardId } = req.params;

    const lists = await listService.get({ boardId }).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(lists);
});

router.post(
    "/board/:boardId/list/create",
    async (req, res) => {
        const listService = Container.get(ListService);

        const { boardId } = req.params;
        const { title } = req.body;

        const list = await listService
        .create({
            boardId,
            title
        })
        .catch(error => {
            return res.status(500).json({ error });
        });

        return res.status(201).json(list);
    }
);

router.get("/board/:boardId/cards", async (req, res) => {
    const cardService = Container.get(CardService);
    const listService = Container.get(ListService);

    const { boardId } = req.params;

    try {
      const lists = await listService.get({ boardId });

      const listIds = lists.map(l => l._id);

      const cards = await cardService.get({ listId: { $in: listIds } });

      return res.status(200).json(cards);
    } catch (error) {
      return res.status(500).json({ error });
    }
  });

router.post("/board/create", async (req, res) => {
    const boardService = Container.get(BoardService);

    const { title } = req.body;

    const board = await boardService
      .create({
        title
      })
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(201).json(board);
});

router.patch("/board/:boardId/update-list-order", async (req, res) => {

    const listService = Container.get(ListService);

    const { boardId } = req.params;

    const {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex,
    } = req.body;

    // вытащить все списки на доску
    const lists = await listService.get({ boardId });

    const [list] = lists.splice(sourceIndex, 1);
    lists.splice(destinationIndex, 0, list)

    const orderedLists = lists.map((l, index) => {
      return { id: l._id, sortOrder: index + 1 };
    });

    //TODO: Реализация нескольких обновлений, а не отдельные запросы
    orderedLists.forEach(async (l) => {
      await listService.update(l.id, {
        sortOrder: l.sortOrder,
      });
    });

    return res.status(200).json(lists);
});

router.patch("/board/:boardId/update", async (req, res) => {
    const boardService = Container.get(BoardService);

    const { boardId } = req.params;
    const { title } = req.body;

    const board = await boardService
      .update(boardId, {
        title
      })
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(200).json(board);
});

router.delete("/board/:boardId/delete", async (req, res) => {
    const boardService = Container.get(BoardService);

    const { boardId } = req.params;

    const board = await boardService.delete(boardId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(204).json(board);
});

module.exports = router