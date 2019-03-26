const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    },
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
    db('bears')
    .then(bears => {
        res.status(200).json(bears);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('bears')
    .where({ id })
    .first()
    .then(bear => {
        res.status(200).json(bear);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.post('/', (req, res) => {
    const { name } = req.body;

    if(name !== undefined || name !== "") {
    db('bears')
    .insert(req.body)
    .then(bear => {
        res.status(201).json(bear);
    })
    .catch(error => {  
        res.status(500).json(error);
    })
    } else {
        res.status(400).json({ errorMessage: "Please provide a name"})
    }

})

router.put('/:id', (req, res) => {
    const { id } = req.params;

    db('bears')
    .where({ id })
    .update(req.body)
    .then(count => {
        if (count > 0) {
            res.status(200).json(count);
        } else {
            res.status(404).json({ message: 'Bear not found' });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('bears')
    .where({ id })
    .del()
    .then(count => {
        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Bear not found' });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });

})

module.exports = router;