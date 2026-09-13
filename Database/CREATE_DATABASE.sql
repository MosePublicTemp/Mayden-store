CREATE DATABASE MaydenShopping;

USE MaydenShopping;

CREATE TABLE FoodItem
(
    Id INT AUTO_INCREMENT PRIMARY KEY, 
    Name VARCHAR(2000) NOT NULL, 
    Barcode VARCHAR(12) NOT NULL, 
    Price DECIMAL(6, 2) NOT NULL
);

INSERT INTO FoodItem (Name, Barcode, Price)
    VALUES
        ('Raspberries', '287377667', 2.25),
        ('Banana', '303869954', 1.60),
        ('Pear', '253561247', 0.52),
        ('Pink Lady Apples', '284477542', 2.90),
        ('BlueBerries', '287356888', 2.00),
        ('Oranges', '253554170', 2.20),
        ('Lemons', '257875814', 1.45),
        ('Lime', '253560634', 0.23),
        ('Red Grapes', '260138854', 2.00),
        ('Granny Smith Apples', '284475832', 1.80);