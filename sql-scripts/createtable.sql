USE master;
GO

-- Criando um banco de dados chamado "AbastecimentoVeiculos"
CREATE DATABASE AbastecimentoVeiculos;
GO

USE AbastecimentoVeiculos;
GO

-- Crie uma tabela para armazenar os registros de abastecimento
CREATE TABLE Abastecimento (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    PlacaVeiculo VARCHAR(7) NOT NULL,
    QuantidadeLitros INT NOT NULL,
    Combustivel VARCHAR(50) NOT NULL,
    DataAbastecimento DATE NOT NULL,
    HorarioAbastecimento TIME NOT NULL
);
GO
