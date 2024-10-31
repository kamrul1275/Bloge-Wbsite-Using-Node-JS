const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Category = require('../models/Category');
// const Subcategory = require('../models/Subcategory'); // Adjust the path as necessary
const { Op } = require('sequelize');// Adjust the path as necessary
const { get } = require('express/lib/response');
const multer = require('multer');
const path = require('path');


require('dotenv').config();


const app = express();

// Middleware for parsing application/json
app.use(express.json());
// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


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
// exports.createCategory = async (req, res) => {
//     const { category_name, category_image } = req.body;

//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);

//     // Validate input data
//     if (!category_name) {
//         return res.status(400).json({ message: 'Please provide all required fields' });
//     }

//     try {
//         // Create a new category
//         const newCategory = await Category.create({
//             category_name,
//             category_image
//         });

//         // Send success response
//         res.status(201).json({
//             message: 'Category created successfully',
//             category: newCategory
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



// Configure storage for uploaded files
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Ensure this directory exists or create it
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename with original extension
//     }
// });

// const upload = multer({ storage });

// Route handler with `multer` middleware
// exports.createCategory = [
//     upload.single('category_image'), // The name of the file field in the form should match this
//     async (req, res) => {
//         const { category_name } = req.body;
//         const category_image = req.file ? req.file.filename : null;

//         console.log('Headers:', req.headers);
//         console.log('Body:', req.body);
//         console.log('File:', req.file);

//         // Validate input data
//         if (!category_name) {
//             return res.status(400).json({ message: 'Please provide all required fields' });
//         }

//         try {
//             // Create a new category
//             const newCategory = await Category.create({
//                 category_name,
//                 category_image // Storing only the filename in the database
//             });

//             // Send success response
//             res.status(201).json({
//                 message: 'Category created successfully',
//                 category: newCategory
//             });
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// ];

// Assuming this is in categoryController.js

const storage = multer.diskStorage({
    destination: './uploads/', // Ensure this directory exists
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

// Export both `upload` and `createCategory`
exports.upload = upload;
exports.createCategory = async (req, res) => {
    console.log("Checking data:", req.body);
    console.log("Uploaded File:", req.file);

    const { category_name } = req.body;
    const category_image = req.file ? req.file.path : null;

    if (!category_name || !category_image) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const newCategory = await Category.create({
            category_name,
            category_image
        });

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
