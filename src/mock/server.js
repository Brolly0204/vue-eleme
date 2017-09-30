let express = require('express');
let app = express();
let router = express.Router();

let {seller, ratings, goods} = require('./data.json');
let resObj = {errno: 0, data: []};

router.get('/seller', (req, res) => {
  resObj.data = seller;
  res.json(resObj);
});

router.get('/ratings', (req, res) => {
  resObj.data = ratings;
  res.json(resObj);
});

router.get('/goods', (req, res) => {
  resObj.data = goods;
  res.json(resObj);
});

app.use('/api', router);

app.listen(7000, () => console.log('Server listening to 7000'));
