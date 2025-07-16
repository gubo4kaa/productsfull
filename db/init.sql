CREATE TABLE IF NOT EXISTS product (
  id SERIAL PRIMARY KEY,
  article VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price NUMERIC CHECK (price > 0),
  quantity INT CHECK (quantity >= 0),
  createdAt TIMESTAMP DEFAULT now()
);

INSERT INTO product (article, name, price, quantity) VALUES
('ART123', 'Товар 11111', 100, 10),
('ARrT4256', 'Товар 212', 200, 5),
('A1RT4156', 'Товар 21', 200, 5),
('AR1T4256', 'Товар 22', 200, 5),
('AR113T2456', 'Товар223', 200, 5),
('ART4456', 'Товар223', 200, 5);