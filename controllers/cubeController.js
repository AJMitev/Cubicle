const cubeModel = require('../models/cube');

function getHome(req, res) {
  const { from, to, search } = req.query;
  let query = {};

  if (search) {
    query = { ...query, name: { $regex: search } };
  }

  if (to) {
    query = { ...query, difficultyLevel: { $lte: +to } };
  }

  if (from) {
    query = {
      ...query,
      difficultyLevel: { ...query.difficultyLevel, $gte: +from }
    };
  }

  cubeModel
    .find(query)
    .then(cubes => {
      res.render('index.hbs', { cubes, from, to, search });
    })
    .catch(console.error);
}

function getCreate(req, res) {
  res.render('cube/create.hbs');
}

function postCreate(req, res) {
  new cubeModel({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    difficultyLevel: req.body.difficultyLevel
  }).save((err, cube) => {
    if (err) {
      console.error(err);
      res.redirect('/not-found');
      return;
    }

    res.redirect('/');
  });
}

function getDetails(req, res) {
  cubeModel
    .findById(req.params.id)
    .populate('accessories')
    .then(cube => {
      if (!cube) {
        res.redirect('/not-found');
        return;
      }

      res.render('cube/details.hbs', cube);
    });
}

module.exports = {
  getHome,
  getCreate,
  postCreate,
  getDetails
};
