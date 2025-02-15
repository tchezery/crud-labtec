require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Pegando a URI do banco do .env
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://tchezery:labtec@cluster1.96jqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

console.log('MONGO_URI:', mongoUri);

// Conexão com o MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

// Rotas
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);

// Configuração da porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
