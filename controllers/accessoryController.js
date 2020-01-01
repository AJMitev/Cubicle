const accesorryModel = require('../models/accessory');
const cubeModel = require('../models/cube');

const getCreate = function(req, res) {
  res.render('accessory/create.hbs');
};

const postCreate = function(req, res) {
  new accesorryModel({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  }).save((err, entity) => {
    if (err) {
      console.error(err);
      res.redirect('/not-found');
      return;
    }

    res.redirect('/');
  });
};

const getAttach = function(req, res, next) {
  const cubeId = req.params.id;

  cubeModel
    .findById(cubeId)
    .then(cube =>
      Promise.all([cube, accesorryModel.find({ cubes: { $nin: cubeId } })])
    )
    .then(([cube, filteredAccessories]) => {
      res.render('accessory/attach.hbs', {
        cube,
        accessories: filteredAccessories
      });
    })
    .catch(next);
};

const postAttach = function(req, res, next) {
  const cubeId = req.params.id;
  const accessoryId = req.body.accessory;

  Promise.all([
    cubeModel.update({ _id: cubeId }, { $push: { accessories: accessoryId } }),
    accesorryModel.update({ _id: accessoryId }, { $push: { cubes: cubeId } })
  ])
    .then(() => {
      res.redirect(`/details/${cubeId}`);
    })
    .catch(next);

  // cubeModel.findById(cubeId).then(cube => {
  //   accesorryModel.find(accessoryId).then(accessory => {

  //     cube.accessories.push(accessory);
  //     cube.save((err, entity) => {
  //       if (err) {
  //         console.error(err);
  //         res.redirect('/not-found');
  //       }

  //       res.redirect(`/details/${cubeId}`);
  //     });
  //   });
  // });
};

module.exports = {
  getCreate,
  postCreate,
  getAttach,
  postAttach
};
