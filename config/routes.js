const homeController = require('../controllers/homeController');
const cubeController = require('../controllers/cubeController');
const accessoryController = require('../controllers/accessoryController');

module.exports = app => {
  app.get('/', cubeController.getHome);
  app.get('/about', homeController.getAbout);
  app.get('/not-found', homeController.notFound);

  app.get('/create', cubeController.getCreate);
  app.get('/details/:id', cubeController.getDetails);

  app.get('/accessory/create', accessoryController.getCreate);
  app.get('/accessory/attach/:id', accessoryController.getAttach);

  app.post('/create', cubeController.postCreate);

  app.post('/accessory/create', accessoryController.postCreate);
  app.post('/accessory/attach/:id', accessoryController.postAttach);
};
