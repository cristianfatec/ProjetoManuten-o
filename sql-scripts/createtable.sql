-- create-table.sql

CREATE DATABASE IF NOT EXISTS Abastecimento;

USE AbastecimentoVeiculos;

CREATE TABLE IF NOT EXISTS Abastecimento (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    PlacaVeiculo VARCHAR(7) NOT NULL,
    QuantidadeLitros INT NOT NULL,
    Combustivel VARCHAR(50) NOT NULL,
    PrecoLitro DECIMAL(10, 2) NOT NULL,
    ValorTotal DECIMAL(10, 2) NOT NULL,
    DataAbastecimento DATE NOT NULL,
    HorarioAbastecimento TIME NOT NULL
);
