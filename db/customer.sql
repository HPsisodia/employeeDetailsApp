CREATE TABLE users(
   id                                   BIGSERIAL NOT NULL,
   user_id                              VARCHAR(256) NOT NULL PRIMARY KEY,
   user_name                            VARCHAR(128),
   user_email                           VARCHAR(40),
   user_password                        VARCHAR(256),
   user_role                            VARCHAR(15),
   user_image                           VARCHAR(100),
   total_orders                         INTEGER,
   created_at                           VARCHAR(40),
   last_logged_in                       VARCHAR(40),
 );

INSERT INTO users (
user_id,
user_name,
user_email,
user_password,
user_role,
user_image,
total_orders,
created_at,
last_logged_in ) VALUES

('bee763d9-1f10-4239-87ec-121e643280d1','Admin','admin@gmail.com','$2a$13$wB1YyqORZyn5luOCstMWrOCcmpGbhMYWeGigWC58AXDx.6q.Xfz/G', 'admin', 'user-admin@gmail.com-profile.jpeg',0, '2021-11-26T01:15:06+05:30', '2021-11-26T01:15:58+05:30'),
('de0af9a9-c7c9-44c9-bf0e-c87dd38991e5','Hritik Singh','hritik@gmail.com','	$2a$13$zh2J1LZe8qGMo0FJV/KlFO4NEnRjLdLRiZZKRRdceVwFEYBFN6pOq', 'customer', 'user-hritik@gmail.com-profile.jpeg', 2 ,'2021-11-26T01:15:06+05:30', '2021-11-26T01:17:18+05:30'),
('e40456d0-e374-4d1d-a4bc-2665bf56a796','Neha Sharma','neha@gmail.com','$2a$13$YXVGAgj.cL/9lCYiKYP1EOuthprEWI2xdQMbp61MJ293.254Pdj5q', 'customer', 'user-neha@gmail.com-profile.jpeg', 4,'2021-11-26T01:15:06+05:30', '2021-11-26T01:17:55+05:30'),
('5acaaaa3-6313-47e8-8961-106ce76c9a66','Pawan Chaudhary','pawan@gmail.com','$2a$13$EaEU3K7qaW5cN0ZewNE9p.xdC6E1thZo5pM6Et2gw2MZwRUTa6Xem', 'customer', 'user-pawan@gmail.com-profile.jpeg', 1,'2021-11-26T01:15:06+05:30', '2021-11-26T01:19:06+05:30');
