const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
// const Subcategory = require('../models/Subcategory'); // Adjust the path as necessary
const { Op } = require('sequelize');// Adjust the path as necessary
const { get } = require('express/lib/response');
require('dotenv').config();




// Get all categories
// exports.getAllCategories = (req, res) => {
//     console.log('getAllCategories');
//     let sql = 'SELECT * FROM categories';
//     db.query(sql, (err, results) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(results);
//         }
//     });
// };

//Get all categories

exports.getAllCategories = async (req, res) => {

   
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Get category by ID

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Create new category
exports.createCategory = async (req, res) => {
    const { category_name, category_image } = req.body;

    console.log('createCategory');
  

    // Validate input data
    if (!category_name) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Create a new category
        const newCategory = await Category.create({
            category_name,
            category_image
        });

        // Send success response
        res.status(201).json({
            message: 'Category created successfully',
            category: newCategory
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Update category
exports.updateCategory = async (req, res) => {
    const { category_name, category_image } = req.body;

    // Validate input data
    if (!category_name) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Update the category
        const category = await Category.findByPk(req.params.id);
        if (category) {
            category.category_name = category_name;
            category.category_image = category_image;
            await category.save();
            res.status(200).json({
                message: 'Category updated successfully',
                category
            });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete category

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await category.destroy();
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//end of deleteCategory function
//end of deleteUser function
//end of updateUser function
//end of getUserById function
//end of authController.js file
//end of categoryController.js file
