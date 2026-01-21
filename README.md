# Modular TypeScript Todo API

A hands-on DevOps project demonstrating core principles: CI/CD, Containerization, IaC, Observability, Reliability, and Security.

## 🚀 Features

- **Modular Architecture**: Layered structure (Controller, Service, Model) using TypeScript & Express.
- **CI/CD**: GitHub Actions pipeline for linting and testing.
- **Containerization**: Docker & Docker Compose setup.
- **Infrastructure as Code**: Terraform configuration for local resource provisioning.
- **Observability**: Structured JSON logging with Winston & HTTP access logging.
- **Reliability**: Health check endpoint (`/health`) & Graceful Shutdown.
- **Security**: Input validation with Zod & Security headers with Helmet.

## 🛠️ Prerequisites

- Node.js v18+
- Docker & Docker Compose
- Terraform (Optional, for IaC demo)

## 🏁 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Local Development

```bash
npm run dev
```

### 3. Run with Docker

```bash
docker-compose up --build
```

### 4. Run Tests

```bash
npm test
```

## 📂 Project Structure

```
src/
├── common/         # Shared utilities (Logger, Middleware)
├── modules/        # Feature modules (Todo, Health)
├── infra/          # Infrastructure (Terraform)
├── app.ts          # Express App Setup
└── server.ts       # Server Entry Point
```

## 🔗 Endpoints

- `GET /health`: Check API status.
- `GET /todos`: List all todos.
- `POST /todos`: Create a todo (Body: `{ "title": "..." }`).
- `PATCH /todos/:id`: Update a todo.
- `DELETE /todos/:id`: Delete a todo.
