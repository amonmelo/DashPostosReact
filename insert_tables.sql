-- Inserir dados na tabela sales_by_nozzle (vendas por bico)
INSERT INTO sales_by_nozzle (nozzle_number, fuel_type, liters_sold, total_sales, sale_date)
VALUES
  (1, 'Gasolina Comum', 1500, 500.00, '2024-10-15'),
  (2, 'Diesel', 1000, 300.00, '2024-10-15'),
  (3, 'Etanol', 800, 200.00, '2024-10-15');

-- Inserir dados na tabela sales_by_payment_method (vendas por forma de pagamento)
INSERT INTO sales_by_payment_method (payment_method, total_sales, sale_date)
VALUES
  ('Pix', 400.00, '2024-10-15'),
  ('Cartão de Crédito', 500.00, '2024-10-15'),
  ('Cartão de Débito', 300.00, '2024-10-15'),
  ('Nota a Prazo', 100.00, '2024-10-15'),
  ('Dinheiro', 200.00, '2024-10-15');

-- Inserir dados na tabela sales_by_shift (vendas por turno)
INSERT INTO sales_by_shift (shift_name, operator_name, total_sales, sale_date)
VALUES
  ('Manhã', 'João Silva', 600.00, '2024-10-15'),
  ('Tarde', 'Maria Oliveira', 400.00, '2024-10-15'),
  ('Noite', 'Pedro Santos', 500.00, '2024-10-15');

-- Inserir dados na tabela top_clients (clientes mais vendidos)
INSERT INTO top_clients (client_name, total_sales, sale_date)
VALUES
  ('João Pereira', 1200.00, '2024-10-15'),
  ('Maria Silva', 1100.00, '2024-10-15'),
  ('Carlos Souza', 900.00, '2024-10-15'),
  ('Ana Oliveira', 850.00, '2024-10-15'),
  ('José Lima', 700.00, '2024-10-15');

-- Inserir dados na tabela sangria_suprimento (sangria e suprimento)
INSERT INTO sangria_suprimento (sangria, suprimento, sale_date)
VALUES
  (100.00, 50.00, '2024-10-15');
