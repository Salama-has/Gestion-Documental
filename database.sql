DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `posts`;
DROP TABLE IF EXISTS `authors`;
DROP TABLE IF EXISTS `tags`;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  picture VARCHAR(255) NOT NULL
  );
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  caTname VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author INT NOT NULL,
  post_date DATE NOT NULL,
  category_id INT NOT NULL,
  tag_id INT NOT NULL,
  file VARCHAR(255),
  FOREIGN KEY (author) REFERENCES authors(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

CREATE TABLE authors (
    id INT NOT NULL AUTO_INCREMENT,
    authorname VARCHAR(255) NOT NULL ,
    PRIMARY KEY (id)
);
CREATE TABLE tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taGname VARCHAR(255) NOT NULL
);


-- Insert into categories table
INSERT INTO categories (caTname)
VALUES ('Technology'), 
       ('Business'), 
       ('Sports'),  
       ('Entertainment'), 
       ('Health');

-- Insert into users table
INSERT INTO users (username, email, password,picture)
VALUES  ('John Malek', 'john@example.com', 'password', 'https://example.com/john.jpg'),
        ('karima Doe', 'jane@example.com', 'password', 'https://example.com/jane.jpg'),
        ('Bob Smith', 'bob@example.com', 'password', NULL);

-- Insert into posts table
INSERT INTO posts (title, content, author, post_date, category_id,tag_id,file) 
VALUES ('10 Tips for Better Productivity', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit euismod velit, eget ultrices mi. Integer et enim pharetra.', 1, '2022-01-01', 1,1,'DiarioUT5_2023.pdf'),
       ('The Greatest Athletes of All Time', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit euismod velit, eget ultrices mi. Integer et enim pharetra.', 2, '2022-01-02', 2,2,'DiarioUT5_2023.odt'),
       ('10 Must-See Movies of the Year', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit euismod velit, eget ultrices mi. Integer et enim pharetra.', 1, '2022-01-03', 3,3,'partido.mp4'),
       ('10 Tips for Better Productivity', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit euismod velit, eget ultrices mi. Integer et enim pharetra.', 1, '2022-01-01', 1,1,'DiarioUT5_2023.pdf'),
       ('The Greatest Athletes of All Time', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit euismod velit, eget ultrices mi. Integer et enim pharetra.', 2, '2022-01-02', 2,2,'DiarioUT5_2023.odt'),
       ('10 Must-See Movies of the Year', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit euismod velit, eget ultrices mi. Integer et enim pharetra.', 3, '2022-01-03', 3,3,'partido.mp4'),
       ('10 Tips for Better Productivity', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit euismod velit, eget ultrices mi. Integer et enim pharetra.', 1, '2022-01-01', 1,1,'DiarioUT5_2023.pdf'),
       ('The Greatest Athletes of All Time', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit euismod velit, eget ultrices mi. Integer et enim pharetra.', 2, '2022-01-02', 2,2,'DiarioUT5_2023.odt'),
       ('10 Must-See Movies of the Year', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit euismod velit, eget ultrices mi. Integer et enim pharetra.', 1, '2022-01-03', 3,3,'partido.mp4');
-- Insert into comments table
       INSERT INTO authors (authorname)
VALUES ('Victor Hugo'),
       ('Bertus Aafjes'),
       ('Hans Aanrud');

-- Insert into tags table
INSERT INTO tags (taGname)
VALUES ('pdf'), 
       ('odt'), 
       ('mp4');
