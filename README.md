# TaskTracker

TaskTracker — это простое и удобное full‑stack приложение для управления задачами.  
Проект состоит из двух независимых частей:

- **Backend** — ASP.NET Core Web API  
- **Frontend** — React + TypeScript + Vite  

Данные хранятся в **PostgreSQL**, доступ осуществляется через **Entity Framework Core**.  
Фронтенд использует **React Query**, **Axios** и **Tailwind CSS**.

---

## 🚀 Возможности

- Создание задач  
- Редактирование задач  
- Удаление задач  
- Просмотр списка задач  
- Автоматическое обновление UI через React Query  
- Чистый и минималистичный интерфейс  

---

## 📁 Структура проекта

TaskTracker/
│
├── backend/
│   ├── Controllers/
│   │   └── TasksController.cs
│   ├── Data/
│   │   └── AppDbContext.cs
│   ├── Models/
│   │   └── TaskItem.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── TaskTracker.Api.csproj
│
└── frontend/
├── src/
│   ├── components/
│   │   ├── TaskForm.tsx
│   │   └── TaskList.tsx
│   ├── api.ts
│   ├── types1.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.ts

Code

---

## 🖥 Backend — запуск

### 1. Перейти в папку backend

```bash
cd backend
2. Настроить строку подключения в appsettings.json
json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=tasks;Username=postgres;Password=yourpassword"
}
3. Применить миграции
bash
dotnet ef database update
4. Запустить API
bash
dotnet run
API:

Code
http://localhost:5065
Swagger:

Code
http://localhost:5065/swagger
🌐 Frontend — запуск
1. Перейти в папку frontend
bash
cd frontend
2. Установить зависимости
bash
npm install
3. Запустить dev‑сервер
bash
npm run dev
Фронтенд:

Code
http://localhost:5173
🔗 Настройка CORS
В Program.cs:

csharp
policy.WithOrigins("http://127.0.0.1:5173")
      .AllowAnyHeader()
      .AllowAnyMethod();
☁️ Деплой
Backend → Render
Создать Web Service

Build Command:

Code
dotnet build
Start Command:

Code
dotnet TaskTracker.Api.dll
Добавить переменную окружения:

Code
ConnectionStrings__DefaultConnection=...
Создать PostgreSQL в Render → Databases

Подставить строку подключения

Deploy

Frontend → Vercel
Создать новый проект

Указать папку frontend

Build Command:

Code
npm run build
Output Directory:

Code
dist
Добавить переменную окружения:

Code
VITE_API_URL=https://your-api.onrender.com
Deploy

📡 Примеры API запросов
GET /tasks
bash
curl http://localhost:5065/tasks
POST /tasks
json
{
  "title": "New task",
  "description": "Description",
  "status": "new"
}