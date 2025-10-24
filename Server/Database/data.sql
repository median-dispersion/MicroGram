INSERT OR IGNORE INTO `unit_types` (`id`, `name`) VALUES
(1, 'Mass'),
(2, 'Length');

INSERT OR IGNORE INTO `units` (`id`, `unit_type_id`, `name`, `symbol`, `base`) VALUES
(1, 1, 'Kilogram', 'kg', 1.0),
(2, 1, 'Gram', 'g', 0.001),
(3, 2, 'Meter', 'm', 1.0),
(4, 2, 'Centimeter', 'cm', 0.01);