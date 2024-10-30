const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Define routes for posts
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;