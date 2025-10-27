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