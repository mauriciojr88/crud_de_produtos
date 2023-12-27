<?php
// Simulação de um banco de dados usando SQLite
$db = new SQLite3('produtos.db');

// Criação da tabela de produtos (se não existir)
$db->exec('CREATE TABLE IF NOT EXISTS produtos (codigo TEXT PRIMARY KEY, nome TEXT, descricao TEXT, preco REAL)');

// Manipulação de requisições
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['codigo'])) {
        // Consultar um produto específico
        $codigo = $_GET['codigo'];
        $stmt = $db->prepare('SELECT *