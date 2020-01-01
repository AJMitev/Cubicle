const cubeModel = require('../models/cube');

function getHome(req, res) {
  const { from, to, search } = req.body;

  const findFn = item => {
    const result = true;
    if (search) {
      result = item.name.toLowerCase().includes(search.toLowerCase());
    }

    if (result && from) {
      result = +item.difficultyLevel >= +from;
    }

    if (result && to) {
      result = +item.difficultyLevel <= +to;
    }

    return result;
  };

  cubeModel
    .find()
    .then(cubes => {
      res.render('index.hbs', { cubes });
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
