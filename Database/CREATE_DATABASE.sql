CREATE DATABASE MaydenShopping;

USE MaydenShopping;

CREATE TABLE FoodItem
(
    Id INT PRIMARY KEY, 
    Name VARCHAR(2000) NOT NULL, 
    Barcode VARCHAR(12) NOT NULL, 
    Price DECIMAL(6, 2) NOT NULL
)