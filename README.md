-------------------
Task Management App
-------------------

Merupakan aplikasi fullstack berbasis Laravel sebagai Backend dan React Vite sebagai Frontend untuk mengelola daftar tugas yang memiliki status task (To Do, In Progress, Done) dengan autentikasi JWT. dngan aplikasi ini Pengguna dapat login, menambah, mengedit, menghapus, dan mengganti status task secara real-time.


------------------------
Teknologi yang Digunakan
------------------------

#Backend:
- **Laravel 9.52.21**
- **MySQL**
- **Laravel Passport / Sanctum (JWT Auth)**
- **Eloquent ORM**

#Frontend:
- **React 19.2.0 (Vite)**
- **Tailwind CSS**
- **Fetch API**
- **React Hooks**



--------------------------
Langkah Menjalankan Proyek
--------------------------


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

-------------------------------------------------
Frontend - Task Management System React 19.2.0 (Vite)
-------------------------------------------------

Frontend dari aplikasi Task Management yang dibangun dengan React.js (Vite) dan Tailwind CSS.  
Terkoneksi dengan backend Laravel melalui REST API.

# Instalasi & Menjalankan Frontend

# Masuk ke folder frontend
  
  cd frontend

# Install dependency
  
  npm install

# Jalankan server development
  
  npm run dev

# Aplikasi akan berjalan di:

  http://127.0.0.1:5173


-----------
Login Dummy
-----------

Email : admin1@gmail.com
Password : Admin123
