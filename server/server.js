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
    'INSERT INTO Abastecimento (PlacaVeiculo, QuantidadeLitros,hodometro, Combustivel, DataAbastecimento, HorarioAbastecimento) VALUES (?, ?, ?, ?, ?)',
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

//GET para página dashboard

// Rota para obter informações com base nos filtros do dashboard
app.get('/relatorio', (req, res) => {
  const { dataInicial, dataFinal, placa, informacoes } = req.query;

  // Construir a consulta SQL com base nos filtros fornecidos
  let sqlQuery = 'SELECT ';

  switch (informacoes) {
    case 'litros':
      sqlQuery += 'SUM(QuantidadeLitros) AS total FROM Abastecimento ';
      break;
    case 'reais':
      sqlQuery += 'SUM(ValorTotal) AS total FROM Abastecimento ';
      break;
    case 'media':
      sqlQuery += 'AVG(QuantidadeLitros) AS media FROM Abastecimento ';
      break;
    default:
      res.status(400).json({ error: 'Informações inválidas fornecidas.' });
      return;
  }

  sqlQuery += 'WHERE DataAbastecimento BETWEEN ? AND ? AND PlacaVeiculo = ?';

  // Executar a consulta no banco de dados MySQL
  db.query(
    sqlQuery,
    [dataInicial, dataFinal, placa],
    (err, result) => {
      if (err) {
        console.error('Erro ao consultar dados no MySQL:', err);
        res.status(500).json({ error: 'Erro ao obter informações.' });
      } else {
        res.status(200).json(result[0]);
      }
    }
  );
});