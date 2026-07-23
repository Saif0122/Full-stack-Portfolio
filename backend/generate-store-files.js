const fs = require('fs');
const path = require('path');

const models = ['product.model.js', 'category.model.js', 'order.model.js', 'license.model.js', 'review.model.js', 'coupon.model.js'];
const repositories = ['product.repository.js', 'order.repository.js', 'category.repository.js', 'license.repository.js'];
const services = ['products.service.js', 'orders.service.js', 'cart.service.js', 'licenses.service.js'];
const controllers = ['products.controller.js', 'orders.controller.js', 'cart.controller.js', 'licenses.controller.js', 'coupons.controller.js', 'reviews.controller.js', 'uploads.controller.js'];
const validators = ['product.validator.js', 'order.validator.js', 'coupon.validator.js'];
const routes = ['products.routes.js', 'orders.routes.js', 'cart.routes.js', 'licenses.routes.js', 'reviews.routes.js'];

function createBoilerplate(dir, files, getTemplate) {
  files.forEach(file => {
    const fullPath = path.join(__dirname, dir, file);
    if (!fs.existsSync(fullPath)) {
      const name = file.split('.')[0];
      fs.writeFileSync(fullPath, getTemplate(name, file));
    }
  });
}

createBoilerplate('models', models, (name) => `const mongoose = require('mongoose');

const ${name}Schema = new mongoose.Schema({
  // Boilerplate schema
}, { timestamps: true });

module.exports = mongoose.model('${name.charAt(0).toUpperCase() + name.slice(1)}', ${name}Schema);
`);

createBoilerplate('repositories', repositories, (name) => `class ${name.charAt(0).toUpperCase() + name.slice(1)}Repository {
  async findAll() {
    // Boilerplate
  }
}

module.exports = new ${name.charAt(0).toUpperCase() + name.slice(1)}Repository();
`);

createBoilerplate('services', services, (name) => `class ${name.charAt(0).toUpperCase() + name.slice(1)}Service {
  async getAll() {
    // Boilerplate
  }
}

module.exports = new ${name.charAt(0).toUpperCase() + name.slice(1)}Service();
`);

createBoilerplate('controllers', controllers, (name) => `class ${name.charAt(0).toUpperCase() + name.slice(1)}Controller {
  async getAll(req, res) {
    res.status(200).json({ message: '${name} endpoint' });
  }
}

module.exports = new ${name.charAt(0).toUpperCase() + name.slice(1)}Controller();
`);

createBoilerplate('validators', validators, (name) => `const { body } = require('express-validator');

exports.create${name.charAt(0).toUpperCase() + name.slice(1)}Validator = [
  body('name').notEmpty().withMessage('Name is required')
];
`);

createBoilerplate('routes', routes, (name) => `const express = require('express');
const router = express.Router();
const ${name.split('.')[0]}Controller = require('../controllers/${name.split('.')[0]}.controller');

router.get('/', ${name.split('.')[0]}Controller.getAll);

module.exports = router;
`);

console.log('Store architecture files generated successfully.');
