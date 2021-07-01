const express = require('express');
const router = express.Router();
let Connector = require("../models/connector.model");

router.route("/").get((req, res) => {
    Connector.find()
        .then(connectors => res.json(connectors))
        .catch(err => res.status(400).json("Error: "+err));
});

router.route('/').post((req, res) => {
    const connector_name = req.body.connector_name;
    const connector_type = req.body.connector_type;

    const newConnector = new Connector({connector_name, connector_type});

    newConnector.save()
        .then(() => res.json('Connector added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route("/:id").delete((req, res) => {
    Connector.findByIdAndDelete(req.params.id)
        .then(() => res.json("Connector deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;