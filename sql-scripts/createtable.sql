-- create-table.sql

-- Criando o banco de dados AbastecimentoVeiculos se ele não existir
CREATE DATABASE AbastecimentoVeiculos;

-- Usando o banco de dados AbastecimentoVeiculos
USE AbastecimentoVeiculos;

-- Criando a tabela Abastecimento se ela não existir
CREATE TABLE Abastecimento (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    PlacaVeiculo VARCHAR(7) NOT NULL,
    QuantidadeLitros INT NOT NULL,
    Combustivel VARCHAR(50) NOT NULL,
    Hodometro DECIMAL(10, 2) NOT NULL,
    PrecoLitro DECIMAL(10, 2) NOT NULL,
    ValorTotal DECIMAL(10, 2) NOT NULL,
    DataAbastecimento DATE NOT NULL,
    HorarioAbastecimento TIME NOT NULL
 
);

-- Adiciona um gatilho (trigger) para calcular a MédiaAbastecimento durante a inserção
CREATE TRIGGER CalculaMediaAbastecimento
ON Abastecimento
AFTER INSERT
AS
BEGIN
    UPDATE Abastecimento
    SET MédiaAbastecimento = 
        CASE
            WHEN (SELECT COUNT(*) FROM INSERTED) > 1 THEN 
                (SELECT (Hodometro - LAG(Hodometro) OVER (PARTITION BY PlacaVeiculo ORDER BY DataAbastecimento, HorarioAbastecimento)) / QuantidadeLitros
                 FROM INSERTED WHERE Abastecimento.ID = INSERTED.ID)
            ELSE
                0  -- Pode ajustar o valor padrão se desejar
        END
    WHERE Abastecimento.ID IN (SELECT ID FROM INSERTED);
END;
