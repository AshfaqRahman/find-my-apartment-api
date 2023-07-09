const express = require('express');
const router = express.Router();


router.get('/auth', (req, res) => {
    const customers = [
        {name: 'John Doe'},
        {name: 'Steve Smith'},
        {name: 'William Johnson'}
    ];
    console.log(customers);
    res.send(customers).status(200);
})


router.get('/ap')
module.exports = router;