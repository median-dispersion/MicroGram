CREATE TABLE IF NOT EXISTS `users` (

    `id` INTEGER PRIMARY KEY,
    `uuid` TEXT NOT NULL UNIQUE,
    `name` TEXT NOT NULL,
    `username` TEXT NOT NULL UNIQUE,
    `password` TEXT NOT NULL,
    `created` TEXT NOT NULL

);

CREATE TABLE IF NOT EXISTS `sessions` (

    `id` INTEGER PRIMARY KEY,
    `uuid` TEXT NOT NULL UNIQUE,
    `user_id` INTEGER NOT NULL,
    `token` TEXT NOT NULL,
    `created` TEXT NOT NULL,
    `last_used` TEXT NOT NULL,
    `expires` TEXT NOT NULL,

    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS `unit_types` (

    `id` INTEGER PRIMARY KEY,
    `uuid` TEXT NOT NULL UNIQUE,
    `name` TEXT NOT NULL UNIQUE

);

CREATE TABLE IF NOT EXISTS `units` (

    `id` INTEGER PRIMARY KEY,
    `uuid` TEXT NOT NULL UNIQUE,
    `unit_type_id` INTEGER NOT NULL,
    `name` TEXT NOT NULL UNIQUE,
    `symbol` TEXT NOT NULL,
    `base` REAL NOT NULL,

    FOREIGN KEY(`unit_type_id`) REFERENCES `unit_types`(`id`) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS `user_units` (

    `user_id` INTEGER NOT NULL,
    `unit_type_id` INTEGER NOT NULL,
    `unit_id` INTEGER NOT NULL,

    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY(`unit_type_id`) REFERENCES `unit_types`(`id`) ON DELETE CASCADE,
    FOREIGN KEY(`unit_id`) REFERENCES `units`(`id`) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS `user_heights` (

    `id` INTEGER PRIMARY KEY,
    `uuid` TEXT NOT NULL UNIQUE,
    `user_id` INTEGER NOT NULL UNIQUE,
    `height_base` REAL NOT NULL,
    `height` REAL NOT NULL,
    `unit_id` INTEGER NOT NULL,

    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY(`unit_id`) REFERENCES `units`(`id`) ON DELETE CASCADE

);