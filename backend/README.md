
-----------------
Struktur Database
-----------------

-- users table
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

-- tasks table
CREATE TABLE tasks (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  title VARCHAR(255),
  description TEXT,
  status ENUM('To Do','In Progress','Done') DEFAULT 'To Do',
  deadline DATE NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


---------------------------------------------
Backend - Task Management System (Laravel 9.52.21)
---------------------------------------------

Backend untuk aplikasi Task Management menggunakan Laravel 11 dan JWT Authentication.  
Berfungsi untuk menangani autentikasi user serta operasi CRUD task.


# Instalasi & Menjalankan Backend

- Masuk ke folder backend melalui terminal
  
  cd backend

- Install dependency Laravel
  
  composer install

- Duplikat file environment

  cp .env.example .env

# Atur koneksi database di file .env

  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=task_management
  DB_USERNAME=root
  DB_PASSWORD=

# Generate app key

  php artisan key:generate

# Jalankan migrasi & seeding database

  php artisan migrate --seed

# Jalankan server lokal

  php artisan serve

# Aplikasi akan berjalan di:

  http://127.0.0.1:8000
