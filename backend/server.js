const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "cadastro_db",
  port: 5432,
});

// Tabela auto-criada ao iniciar a API
const initDb = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS pessoas (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      cpf VARCHAR(14) NOT NULL,
      cep VARCHAR(9) NOT NULL,
      numero VARCHAR(20) NOT NULL,
      complemento VARCHAR(100),
      logradouro VARCHAR(100),
      bairro VARCHAR(100),
      localidade VARCHAR(100),
      uf VARCHAR(2),
      estado VARCHAR(50),
      rua VARCHAR(100)
    );
  `;
  try {
    await pool.query(queryText);
    console.log("Tabela 'pessoas' pronta para uso.");
  } catch (err) {
    console.error("Erro ao inicializar o banco:", err);
  }
};
initDb();

// Endpoint GET: Listagem
app.get("/pessoas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pessoas ORDER BY id DESC;");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar cadastros", details: err.message });
  }
});

// Endpoint POST: Cadastro
app.post("/pessoas", async (req, res) => {
  const { nome, cpf, cep, numero, complemento, logradouro, bairro, localidade, uf, estado, rua } = req.body;
  try {
    const query = `
      INSERT INTO pessoas (nome, cpf, cep, numero, complemento, logradouro, bairro, localidade, uf, estado, rua)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;
    `;
    const values = [nome, cpf, cep, numero, complemento, logradouro, bairro, localidade, uf, estado, rua];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao salvar no banco", details: err.message });
  }
});

app.listen(3000, () => console.log("API rodando na porta 3000"));