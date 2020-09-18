DROP DATABASE IF EXISTS `chubachaBD`;
CREATE DATABASE `chubachaBD`;
USE `chubachaBD`;


DROP TABLE IF EXISTS `category_user`;
create table `category_user`(
    `id` int(10)  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255)
);  

-- write category user
LOCK TABLES `category_user` WRITE;
INSERT INTO `category_user` VALUES (1, 'usuario'), (2, 'admin');
UNLOCK TABLES;


--  TABLE category 
DROP TABLE IF EXISTS `category`;
create table category(
    `id` int(10) auto_increment NOT NULL primary key, 
    `name` varchar(255)
    );

-- write category products
LOCK TABLES `category` WRITE;
INSERT INTO `category` VALUES (1, 'teclados'), (2, 'monitores'),(3,'auriculares'),(4,'mouses'), (5, 'otros');
UNLOCK TABLES;

--  TABLE user  

DROP TABLE IF EXISTS `user`;
create table `user`( 
    `id` int auto_increment NOT NULL primary key, 
    `name` varchar(255),
    `last_name` varchar (255), 
    `email` varchar(255), 
    `password` varchar (255), 
    `avatar` varchar(255),
    `category_id` int,
    CONSTRAINT `user_category_id_foreign` 
    foreign key (`category_id`) 
        references `category_user` (`id`)
    );

-- write user
LOCK TABLES `user` WRITE;
INSERT INTO `user` VALUES (1, 'juan','rodriguez', 'juan@gmail.com','123456', 'profile1.jpg','1'), 
(2, 'pedro', 'pedroza', 'pedro@gmail.com','123456', 'profile2.jpg','2'), 
(3,'eric', 'fullstack', 'eric@gmail.com','123456', 'profile3.jpg','1'), 
(4,'martin', 'siete', 'martin@hotmail.com','asd123', 'profile4.jpg','2');
UNLOCK TABLES;

-- TABLE products 
DROP TABLE IF EXISTS `products`;
create table `products`(
    `id` int auto_increment NOT NULL primary key, 
    `name` varchar(50),
    `description` varchar (50), 
    `price` float, 
    `image` varchar(50),
    `category_id` int, 
    CONSTRAINT `products_category_id_foreign` 
    foreign key (`category_id`) 
        references `category`(`id`)
    );

-- write products
LOCK TABLES `products` WRITE;
INSERT INTO `products` VALUES (1, 'teclado ML120', 'aalsjldflsjkdfjjslkdf', 4000.00, 'imagen1.jpg',1 ), 
(2, 'Monitor DELL As20','aalsjldflsjkdfjjslkdf', 5000.00, 'imagen2.jpg',2 ),
(3,'Auriculares S90','aalsjldflsjkdfjjslkdf', 1500.00, 'imagen3.jpg',3),
(4,'Mouse 221AL','aalsjldflsjkdfjjslkdf', 1000.00, 'imagen4.jpg',4), 
(5, 'Teclado 12 Raizen','aalsjldflsjkdfjjslkdf', 44000.00, 'imagen5.jpg',1),
(6, 'Monitor HP L1200','aalsjldflsjkdfjjslkdf', 4300.00, 'imagen6.jpg',2),
(7,'Auricular R2D2','aalsjldflsjkdfjjslkdf', 5300.00, 'imagen7.jpg',3),
(8,'Mouse Chewbaca','aalsjldflsjkdfjjslkdf', 12000.00, 'imagen8.jpg',4), 
(9, 'Placa de video NVIDIA','aalsjldflsjkdfjjslkdf', 24000, 'imagen9.jpg',5);
UNLOCK TABLES;

-- TABLE purchase 
DROP TABLE IF EXISTS `purchase`;
create table `purchase`(
    `id` int auto_increment not null primary key, 
    `user_id` int,
    `product_id` int, 
    `date` date, 
    `precio_total` float,
    CONSTRAINT `purchase_user_id_foreign`  
    foreign key (`user_id`) 
        references `user`(`id`),
    CONSTRAINT `purchase_category_id_foreign`  
    foreign key (`product_id`) 
        references `products`(`id`)
    );

