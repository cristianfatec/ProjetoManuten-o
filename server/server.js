const express = require('express');
const mysql = require('mysql');
const app = express();
//const bodyparser = require(body-parser)
const port = 3000;
//app.use(bodyparser)
// Configurações do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario_mysql',
  password: 'sua_senha_mysql',
  database: 'AbastecimentoVeiculos'
});

// Conectar ao banco de dados MySQL
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Middleware para processar dados JSON
app.use(express.json());

// Rota para receber dados de abastecimento via POST
app.post('/abastecimento', (req, res) => {
  const { placa, litros, combustivel, precoLitro, valorTotal } = req.body;
  const dataAbastecimento = new Date().toISOString().split('T')[0];
  const horarioAbastecimento = new Date().toLocaleTimeString();

  // Inserir dados no banco de dados MySQL
  db.query(
    'INSERT INTO Abastecimento (PlacaVeiculo, QuantidadeLitros, Combustivel, DataAbastecimento, HorarioAbastecimento) VALUES (?, ?, ?, ?, ?)',
    [placa, litros, combustivel, dataAbastecimento, horarioAbastecimento],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados no MySQL:', err);
        res.status(500).json({ error: 'Erro ao registrar abastecimento.' });
      } else {
        res.status(201).json({ message: 'Dados de abastecimento registrados com sucesso.' });
      }
    }
  );
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
