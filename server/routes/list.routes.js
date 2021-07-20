const { Container }  = require( "typedi");
const {Router} = require('express')
const ListService  = require( "../service/list");
const CardService  = require("../service/card");

const router = Router()

router.get("/lists/", async (req, res) => {
    const listService = Container.get(ListService);
    const lists = await listService.get().catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(lists);
});

router.post("/list/create", async (req, res) => {
    const listService = Container.get(ListService);

    const { boardId, title } = req.body;

    const lists = await listService.get();

    const list = await listService.create({ boardId, title, sortOrder: lists.length + 1 }).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(list);
});

router.get("/list/:listId/", async (req, res) => {
    const listService = Container.get(ListService);
    const list = await listService.getById(req.params.listId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(list);
});

router.patch("/list/:listId/update", async (req, res) => {
    const listService = Container.get(ListService);

    const { listId } = req.params;
    const { title } = req.body;

    const list = await listService.update(listId, { title }).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(list);
});

router.post("/list/:listId/clone", async (req, res) => {
    const listService = Container.get(ListService);
    const cardService = Container.get(CardService);

    const { listId } = req.params;

    const list = await listService.getById(listId).catch(error => {
      return res.status(500).json({ error });
    });

    const { boardId, title } = list;

    const cards = await cardService.get({ listId });

    const clonedList = await listService.create({ boardId: list.boardId, title: list.title });

    let clonedCards = [];

    if (cards.length) {
      const cardsToClone = cards.map((c) => {
        const { title, content, sortOrder } = c;
        return {
          title, content, sortOrder, listId: clonedList._id,
        }
      });

      clonedCards = await cardService.create(cardsToClone);
    }

    const response = {
      ...clonedList.toObject(),
      cards: clonedCards
    };

    return res.status(200).json(response);
});

router.patch("/cards/update-order", async (req, res) => {
    const cardService = Container.get(CardService);

    const {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex,
    } = req.body;

    const srcCards = await cardService.get({ listId: sourceId });
    const dstCards = await cardService.get({ listId: destinationId });


    let orderedSrcCards;
    let orderedDstCards;

    if (sourceId !== destinationId) {
      const [card] = srcCards.splice(sourceIndex, 1);
      dstCards.splice(destinationIndex, 0, card);
      orderedDstCards = dstCards.map((c, index) => {
        return { id: c._id, sortOrder: index + 1, listId: destinationId };
      });
    } else {
      const [card] = srcCards.splice(sourceIndex, 1);
      dstCards.splice(destinationIndex, 0, card);
    }

    orderedSrcCards = srcCards.map((c, index) => {
      return { id: c._id, sortOrder: index + 1 };
    });

    //TODO: Более эффективное мультиобновление
    if (!!orderedDstCards) {
      orderedDstCards.forEach(async (c) => {
        await cardService.update(c.id, {
          sortOrder: c.sortOrder,
          listId: c.listId,
        });
      });
    }

    //TODO: Более эффективное мультиобновление
    orderedSrcCards.forEach(async (c) => {
      await cardService.update(c.id, {
        sortOrder: c.sortOrder,
      });
    });
});

router.delete("/list/:listId", async (req, res) => {
    const listService = Container.get(ListService);

    const { listId } = req.params;

    const list = await listService.delete(listId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(204).json(list);
});

router.get("/list/:listId/cards", (req, res) => {
    const listService = Container.get(ListService);
    const cardService = Container.get(CardService);

    const { listId } = req.params;

    //

    const list = listService.getById(listId);
});


module.exports = router