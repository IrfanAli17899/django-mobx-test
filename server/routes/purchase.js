exports = module.exports = function (app) {
  const express = require('express');
  const queue = require('express-queue');
  const router = express.Router();
  const { Ticket } = app.db.models;

  router.put('/:ticket', async (req, res) => {
    try {
      const { params: { ticket }, body: { amount } } = req;
      const data = await Ticket.findOne({ _id: ticket });
      if (!data) throw Error('No Ticket Is Available');
      if (data.remaining - amount < 0) {
        throw Error('The required amount of tickets are unavailable');
      }
      const updated = await Ticket.findOneAndUpdate({ _id: ticket }, { $inc: { remaining: -amount } }, { new: true });
      res.send({ success: true, data: updated })
    } catch (error) {
      res.status(400).send({ success: false, message: error.message })
    }
  });

  app.use('/purchase', queue({ activeLimit: 1, queuedLimit: -1 }))
  app.use("/purchase", router)
}

