#Drop if DB exists
DROP DATABASE IF EXISTS bamazon;

#create DB
CREATE DATABASE bamazon;

#use DB
USE bamazon;

#create products table
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NULL,
  product_sales BIGINT NULL,
  department_name VARCHAR(255) NULL,
  price decimal(13,2) NULL,
  stock_quantity  BIGINT NULL,
  InsertDate DATETIME DEFAULT NOW(),
  CRUD VARCHAR(10) NULL,
  PRIMARY KEY (item_id)
);

#create departments table
CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(255) NULL,	
  over_head_costs decimal(13,2) NULL,
  InsertDate DATETIME DEFAULT NOW(),
  CRUD VARCHAR(10) NULL,
  PRIMARY KEY (department_id)
);


#inserting values into products table
INSERT INTO products (product_name, product_sales, department_name, price, stock_quantity, CRUD)
VALUES ('Nike Air Jordans','150','Men Shoes','120.5','250','C'),
('Percy Jackson and the Olympians: The Lightning Thief','165','Books','12.99','100','C'),
('Dragon Pearl','51','Books','10.99','44','C'),
('Fashion Sneakers','45','Women Shoes','32','150','C'),
('X-Men','120','Books','14.99','99','C'),
('Sandals','200','Women Shoes','19.99','125','C'),
('Hiking Boots','35','Men Shoes','69.99','55','C'),
('Adidas Track Suit','60','Men Clothes','51','75','C'),
('Nike Track Suit','60','Women Clothes','51','75','C'),
('Jurassic Park','100','Books','8.49','100','C');
    
INSERT INTO departments (department_name, over_head_costs, CRUD)
VALUES ('Books','10000','C'),
('Electronics','95000','C'),
('Men Clothes','25000','C'),
('Men Shoes','25000','C'),
('Women Clothes','40000','C'),
('Women Shoes','35000','C');


#viewing table
select *
from products;

#view only what I want to see
SELECT item_id as ItemId, product_name as Product, product_sales as NoItemsSold, department_name as Department, price as Price, stock_quantity as Stock FROM products;

#view departments
select *
from departments;

#make the table from the homework
SET @dept  = 'Books';

SELECT D.department_id
	, D.department_name
    , D.over_head_costs
    , sum(P.product_sales) as product_sales
    , (P.product_sales - D.over_head_costs) AS total_profit 
FROM departments as D 
	INNER JOIN products as P 
		ON D.department_name = P.department_name 
WHERE D.department_name = @dept 
GROUP BY D.department_id, D.department_name, D.over_head_costs 
ORDER BY 1