-- Active: 1745400910698@@127.0.0.1@3306@nasiya_savdo


CREATE DATABASE IF NOT EXISTS nasiya_savdo


USE nasiya_savdo

drop DATABASE nasiya_savdo

CREATE TABLE `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `locatinon` VARCHAR(255) NOT NULL,
    `passport_id` VARCHAR(255) NOT NULL,
    `card_number` VARCHAR(255) NOT NULL
);

CREATE TABLE `brands` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `category` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `features` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `is_main` BOOLEAN NOT NULL,
    `value_type` VARCHAR(255) NOT NULL
);

CREATE TABLE `laptops` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `brand_id` INT UNSIGNED NOT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `quantity` INT NOT NULL,
    `release_date` DATE NOT NULL,
    `category_id` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`),
    FOREIGN KEY (`category_id`) REFERENCES `category`(`id`)
);
SELECT * FROM users

CREATE TABLE `laptop_specifications` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `laptop_id` BIGINT UNSIGNED NOT NULL,
    `feature_id` INT UNSIGNED NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`laptop_id`) REFERENCES `laptops`(`id`),
    FOREIGN KEY (`feature_id`) REFERENCES `features`(`id`)
);

CREATE TABLE `contracts` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT UNSIGNED NOT NULL,
    `laptop_id` BIGINT UNSIGNED NOT NULL,
    `contract_date` DATETIME NOT NULL,
    `duration_month` INT NOT NULL,
    `total_price_with_interest` DECIMAL(10, 2) NOT NULL,
    `contract_status` ENUM('active', 'completed', 'cancelled') NOT NULL DEFAULT 'active',
    `interest_rate` ENUM('26%', '41%', '52%') NOT NULL,
    `base_price` DECIMAL(10, 2) NOT NULL,
    `initial_payment` DECIMAL(10, 2) NOT NULL,
    `first_payment_date` DATE NOT NULL,
    `monthly_payment` DECIMAL(10, 2) NOT NULL,
    `amount_paid` DECIMAL(10, 2) NOT NULL,
    `remaining_balance` DECIMAL(10, 2) NOT NULL,
    `end_payment_date` DATE NOT NULL,
    FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`laptop_id`) REFERENCES `laptops`(`id`)
);


CREATE TABLE `payments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `contract_id` BIGINT UNSIGNED NOT NULL,
    `amount_paid` DECIMAL(10, 2) NOT NULL,
    `payment_method` ENUM('cash', 'card', 'online') NOT NULL,
    `paid_date` DATETIME NOT NULL,
    FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`)
);

CREATE TABLE `notifications` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `contract_id` BIGINT UNSIGNED NOT NULL,
    `notification` VARCHAR(255) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`)
);

CREATE TABLE `warranty` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `contract_id` BIGINT UNSIGNED NOT NULL,
    `warranty_period_month` INT NOT NULL,
    `warranty_start` DATE NOT NULL,
    `warranty_end` DATE NOT NULL,
    FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`)
);


drop table users

show TABLES

ALTER TABLE users RENAME COLUMN locatinon TO location;


SELECT 
    laptops.id AS laptop_id,
    laptops.name AS laptop_name,
    contracts.contract_date,
    users.id AS user_id,
    users.full_name
FROM contracts
JOIN laptops ON contracts.laptop_id = laptops.id
JOIN users ON contracts.customer_id = users.id
WHERE contracts.contract_date BETWEEN '2025-01-01' AND '2025-09-01';



SELECT 
    u.full_name AS customer_name,
    l.name AS laptop_name,
    c.id AS contract_id,
    c.remaining_balance AS amount_due,
    DATEDIFF(CURDATE(), c.end_payment_date) AS overdue_days
FROM 
    contracts c
JOIN users u ON c.customer_id = u.id
JOIN laptops l ON c.laptop_id = l.id
WHERE 
    c.end_payment_date < CURDATE()
    AND c.remaining_balance > 0
    AND c.contract_status = 'active';
