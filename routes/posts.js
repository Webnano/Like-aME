const express = require('express');
const router = express.Router();
const { getPosts, getPostById, createPost, updateLikes, deletePost } = require('../controllers/postsController');

// Ruta para listar todos los posts
router.get('/', getPosts);

// Ruta para obtener un post por ID
router.get('/:id', getPostById);

// Ruta para crear un nuevo post
router.post('/', createPost);

// Ruta para actualizar los likes de un post por ID
router.put('/:id', updateLikes);

// Ruta para eliminar un post por ID
router.delete('/:id', deletePost);

module.exports = router;

