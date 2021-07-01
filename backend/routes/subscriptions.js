const express = require('express');
const router = express.Router();
let Subscription = require('../models/subscription.model');

router.route('/').get((req, res) => {
    Subscription.find()
        .then(subscription => res.json(subscription))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/').post((req, res) => {
    const user_id = req.body.user_id;
    const status = req.body.status;
    const valid_until = Date.parse(req.body.valid_until);

    const newSubscription = new Subscription({user_id, status, valid_until});

    newSubscription.save()
        .then(() => res.json('Subscription added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/:id").delete((req, res) => {
    Subscription.findByIdAndDelete(req.params.id)
        .then(() => res.json("Subscription deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;