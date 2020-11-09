DROP DATABASE IF EXISTS `chubachaBD`;
CREATE DATABASE `chubachaBD`;
USE `chubachaBD`;


DROP TABLE IF EXISTS `category_user`;
create table `category_user`
(
    `id` int
(10)  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR
(255)
);  

-- write category user
LOCK TABLES `category_user` WRITE;
INSERT INTO 
`category_user`
VALUES
    (1, 'usuario'),
    (2, 'admin');
UNLOCK TABLES;


--  TABLE category 
DROP TABLE IF EXISTS `category`;
create table category(
    `id` int
(10) auto_increment NOT NULL primary key, 
    `name` varchar
(255)
    );

-- write category products
LOCK TABLES `category` WRITE;
INSERT INTO `category`
VALUES
    (1, 'teclados'),
    (2, 'monitores'),
    (3, 'auriculares'),
    (4, 'mouses'),
    (5, 'otros');
UNLOCK TABLES;

--  TABLE user  

DROP TABLE IF EXISTS `user`;
create table `user`
( 
    `id` int auto_increment NOT NULL primary key, 
    `name` varchar
(255),
    `last_name` varchar
(255), 
    `email` varchar
(255), 
    `password` varchar
(255), 
    `avatar` varchar
(255),
    `category_id` int,
    CONSTRAINT `user_category_id_foreign` 
    foreign key
(`category_id`) 
        references `category_user`
(`id`)
    );

-- write user
LOCK TABLES `user` WRITE;
INSERT INTO `user`
VALUES
    (1, 'joaquin', 'rodriguez', 'joa@gmail.com', '$2a$10$hZeadYFEwzGVmg.31gk6VuP5VJEhM3.R9/07YmlcoaSXHY1C0XpQ6', 'profile1.jpg', '1'),
    (2, 'sol', 'pedroza', 'sol@gmail.com', '$2a$10$hZeadYFEwzGVmg.31gk6VuP5VJEhM3.R9/07YmlcoaSXHY1C0XpQ6', 'profile2.jpg', '2'),
    (3, 'eric', 'fullstack', 'eric@gmail.com', '123456', 'profile3.jpg', '1'),
    (4, 'martin', 'siete', 'martin@hotmail.com', 'asd123', 'profile4.jpg', '2');
UNLOCK TABLES;

-- TABLE products 
DROP TABLE IF EXISTS `products`;
create table `products`
(
    `id` int auto_increment NOT NULL primary key, 
    `name` varchar
(50),
    `description` varchar
(200), 
    `price` float, 
    `image` varchar
(50),
    `category_id` varchar
(50)
    );

-- write products
LOCK TABLES `products` WRITE;
INSERT INTO `products`
VALUES
    (1, 'Star Wars dia Darth Vader-Cacos', 'Star Wars dia Darth Vader-Cacos estéreo luminosos con Bluetooth, inalámbricos, micro integrado, almohadillas grandes y diadema ajustable, batería recargable', 4000.00, 'imagen1.jpg', "Auricular" ),
    (2, 'Auricular OFA Star Wars HP9901', 'Auricular OFA Star Wars HP9901 Darth Vader', 5000.00, 'imagen2.jpg', "Auricular" ),
    (3, 'Star Wars HP015SW', 'Star Wars HP015SW Auriculares Estéreo, Diadema Ajustable Y Plegable, Casco Audio', 1500.00, 'imagen3.jpg', "Auricular"),
    (4, 'Star Wars HP9902', 'Auriculares de vincha Star Wars HP9902', 1000.00, 'imagen4.jpg', "Auricular"),
    (5, 'Star Wars xw123', 'descripcion del producto de Chubacha', 44000.00, 'imagen5.jpg', "Auricular"),
    (6, 'Teclado Star Wars', 'descripcion del producto de Chubacha', 4300.00, 'imagen6.jpg', "Teclado"),
    (7, 'Pc Intel I5 9400', 'Star wars Pc Intel I5 9400', 5300.00, 'imagen7.jpg', "CPU"),
    (8, 'Star Wars Gaming Mouse', 'Features 17 buttons for ultimate destruction and skills and dual mode technology for zero downtime', 12000.00, 'imagen8.jpg', "Mouse"),
    (9, 'Star Wars Special Edition Wireless Mouse', 'Ratón inalámbrico Star Wars Special Edition', 24000, 'imagen9.jpg', "Mouse"),
    (10, 'Star Wars HP9902', 'Auriculares de vincha Star Wars HP9902', 1000.00, 'imagen10.jpg', "Auricular")
;
UNLOCK TABLES;

-- TABLE purchase 
DROP TABLE IF EXISTS `purchase`;
create table `purchase`
(
    `id` int auto_increment not null primary key, 
    `user_id` int,
    `product_id` int, 
    `date` date, 
    `precio_total` float,
    CONSTRAINT `purchase_user_id_foreign`  
    foreign key
(`user_id`) 
        references `user`
(`id`),
    CONSTRAINT `purchase_category_id_foreign`  
    foreign key
(`product_id`) 
        references `products`
(`id`)
    );

