const pool = require("../models/db");

const getPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener los posts");
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Post not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching post');
  }
};

const createPost = async (req, res) => {
  const { titulo, img, descripcion, likes = 0 } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *', 
      [titulo, img, descripcion, likes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear el post');
  }
};

const updateLikes = async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;
  try {
    const result = await pool.query(
      'UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *', 
      [likes, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send('Post no encontrado');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error incrementando likes para el post con ID: ${id}:`, err);
    res.status(500).send('Error al actualizar los likes');
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Post no encontrado');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el post');
  }
};

module.exports = { getPosts, getPostById, createPost, updateLikes, deletePost };
