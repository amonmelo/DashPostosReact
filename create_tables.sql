-- Tabela para armazenar as vendas por bico
CREATE TABLE vendas_por_bico (
  id SERIAL PRIMARY KEY,
  numero_bico INTEGER NOT NULL,
  tipo_combustivel VARCHAR(255) NOT NULL,
  litros_vendidos INTEGER NOT NULL,
  total_vendas DECIMAL(10, 2) NOT NULL,
  data_venda DATE NOT NULL
);

-- Tabela para armazenar as vendas por forma de pagamento
CREATE TABLE vendas_por_forma_pagamento (
  id SERIAL PRIMARY KEY,
  forma_pagamento VARCHAR(255) NOT NULL,
  total_vendas DECIMAL(10, 2) NOT NULL,
  data_venda DATE NOT NULL
);

-- Tabela para armazenar as vendas por turno
CREATE TABLE vendas_por_turno (
  id SERIAL PRIMARY KEY,
  nome_turno VARCHAR(255) NOT NULL,
  nome_operador VARCHAR(255) NOT NULL,
  total_vendas DECIMAL(10, 2) NOT NULL,
  data_venda DATE NOT NULL
);

-- Tabela para armazenar os clientes e o valor total que compraram
CREATE TABLE clientes_top (
  id SERIAL PRIMARY KEY,
  nome_cliente VARCHAR(255) NOT NULL,
  total_vendas DECIMAL(10, 2) NOT NULL,
  data_venda DATE NOT NULL
);

-- Tabela para armazenar os valores de sangria e suprimento
CREATE TABLE sangria_suprimento (
  id SERIAL PRIMARY KEY,
  valor_sangria DECIMAL(10, 2) NOT NULL,
  valor_suprimento DECIMAL(10, 2) NOT NULL,
  data_venda DATE NOT NULL
);
