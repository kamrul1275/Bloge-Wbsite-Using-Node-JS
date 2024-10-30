const express = require('express');
const categoryController = require('../controllers/categoryController');
const categoryMiddleware = require('../middleware/categoryMiddleware');

const router = express.Router();

// Get all categories
router.get('/', categoryMiddleware,categoryController.getAllCategories);

// Get a single category by ID
router.get('/:id', categoryMiddleware,categoryController.getCategoryById);

// Create a new category
router.post('/create', categoryMiddleware,categoryController.createCategory);

// Update an existing category by ID
router.put('/update/:id', categoryMiddleware,categoryController.updateCategory);

// Delete a category by ID
router.delete('/delete/:id', categoryMiddleware,categoryController.deleteCategory);

module.exports = router;