const express = require('express');
const bodyParser = require('body-parser');
const postsRoutes = require('./routes/posts');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Sirviendo archivos estáticos
app.use('/posts', postsRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
