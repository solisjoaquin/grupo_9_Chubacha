Create database chubachaBD;

use chubachaBD;


----- Creacion de tablas  ------


---  TABLE category_user-------

create table category_user(id int auto_increment primary key, category_name varchar(50));

---  TABLE category -----

create table category(id int auto_increment primary key, name varchar(50));

---- TABLE user  ------

create table user(id int auto_increment primary key, name varchar(50),last_name varchar (50), email varchar(50), password varchar (50), avatar varchar(50),category_id int, foreign key (category_id) references category_user (id));

---- TABLE products -----

create table products(id int auto_increment primary key, name varchar(50),description varchar (50), cost varchar (50), image varchar(50),category_id int, foreign key (category_id) references category(id));

---  TABLE purchase  -----
create table purchase(id int auto_increment primary key, user_id int,product_id int, date date, precio_total int, foreign key (user_id) references user(id), foreign key (product_id) references products(id));