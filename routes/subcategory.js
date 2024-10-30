const express = require('express');
const subcategoryController = require('../controllers/subcategoryController');
const subcategoryMiddleware = require('../middleware/subcategoryMiddleware');

const router = express.Router();

// Define routes for subcategories
router.get('/', subcategoryMiddleware,subcategoryController.getAllSubcategories);
router.get('/edit/:id', subcategoryMiddleware,subcategoryController.getSubcategoryById);
router.post('/create', subcategoryMiddleware,subcategoryController.createSubcategory);
router.put('/update/:id', subcategoryMiddleware,subcategoryController.updateSubcategory);
router.delete('/delete/:id', subcategoryMiddleware,subcategoryController.deleteSubcategory);

module.exports = router;