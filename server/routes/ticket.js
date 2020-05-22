exports = module.exports = function (app) {
  const express = require('express');
  const router = express.Router();
  const { Ticket } = app.db.models;

  router.post('/', async (req, res) => {
    try {
      const { user, hotel } = req.body;
      const data = await Ticket.find({ user, hotel });
      res.send({ success: true, data })
    } catch (error) {
      res.send({ success: false, message: error.message })
    }
  });

  router.get('/:_id', async (req, res) => {
    try {
      const { _id } = req.params;
      const data = await Ticket.findOne({ _id });
      res.send({ success: true, data })
    } catch (error) {
      res.send({ success: false, message: error.message })
    }
  });

  router.post('/add', async (req, res) => {
    try {
      const newTicket = new Ticket({ ...req.body, remaining: req.body.maxPurchaseCount });
      const data = await newTicket.save();
      res.send({ success: true, data })
    } catch (error) {
      res.status(400).send({ success: false, message: error.message })
    }
  });

  router.put('/update', async (req, res) => {
    try {
      const { name, maxPurchaseCount, _id } = req.body;
      const updated = await Ticket.findOneAndUpdate({ _id }, { name, maxPurchaseCount }, { new: true });
      res.send({ success: true, data: updated })
    } catch (error) {
      res.status(400).send({ success: false, message: error.message })
    }
  });

  router.delete('/delete', async (req, res) => {
    try {
      const { hotel, user, ticket } = req.body;
      console.log(hotel, user, ticket);
      const data = await Ticket.findOneAndRemove({ user, hotel, _id: ticket });
      res.send({ success: true, data })
    } catch (error) {
      res.status(400).send({ success: false, message: error.message })
    }
  });

  app.use("/tickets", router)
}

