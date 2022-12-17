const { Router } = require('express');
const ProductsController = require('../controllers/ProductsController');
const routes = Router();

// Rota raíz para testes
routes.get('/', (request, response) => {
  response.status(200).send({
    title: "API de Produtos",
    version: "0.0.1"
  });
});

// Rota principal para listagem de produtos
routes.get('/products/', ProductsController.expiredProducts);

module.exports = routes;