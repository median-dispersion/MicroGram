INSERT OR IGNORE INTO `unit_types` (`id`, `uuid`, `name`) VALUES
(1,'52b8f1f4-d8bd-4129-8559-a9c4bf549c41', 'Mass'),
(2,'164c7e8e-3b8b-493b-b1e7-b0a8dfced531', 'Length');

INSERT OR IGNORE INTO `units` (`id`, `uuid`, `unit_type_id`, `name`, `symbol`, `base`) VALUES
(1, '603c73e1-17dd-4191-8a5d-3e3af8d00dec', 1, 'Kilogram', 'kg', 1.0),
(2, '8bfcb457-e416-41b1-8bac-17b39064f24d', 1, 'Gram', 'g', 0.001),
(3, '33f4c1c4-f5ff-4c2e-98e1-ec9e466302f0', 2, 'Meter', 'm', 1.0),
(4, '3072cb1c-acbe-4fa7-9d9b-dcf8c4e737a3', 2, 'Centimeter', 'cm', 0.01);