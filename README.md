# 📝 Todo API

A simple **Todo API** built with Next.js, Node.js, and Express, using MySQL for database interaction. Deployed on Railway, it utilizes Axios for API requests, TanStack Query for state management, and TablePlus for database management..

---

## 📜 SQL Schema

```sql
CREATE TABLE todos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

# 🚀 Backend Repository
The backend code for this project is available on GitHub:
## 🔗 [Todo MySQL API](https://github.com/charleslabit/todo-mysql-api)


