# Modular TypeScript Todo API

A hands-on DevOps project demonstrating core principles: CI/CD, Containerization, IaC, Observability, Reliability, and Security.

## 🚀 Features

- **Modular Architecture**: Layered structure (Controller, Service, Model) using TypeScript & Express.
- **CI/CD**: GitHub Actions pipeline for linting and testing.
- **Containerization**: Docker & Docker Compose setup with **Non-root Security**.
- **Orchestration**: Kubernetes manifests (`deployment.yaml`, `service.yaml`) for cluster deployment.
- **Infrastructure as Code**: Terraform configuration for **AWS EC2** provisioning.
- **Observability**: Structured JSON logging & **Prometheus Metrics** (`/metrics`).
- **Reliability**: Health check endpoint (`/health`) & Graceful Shutdown.
- **Security**: Input validation with Zod & Security headers with Helmet.
- **Quality Gates**: ESLint configuration for code standards.

## 🛠️ Prerequisites

- Node.js v18+
- Docker & Docker Compose
- Terraform
- **AWS CLI** (Configured with credentials)
- kubectl (Optional, for K8s)

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

### 4. Quality Checks

```bash
npm test
npm run lint
```

### 5. Deployment

#### Kubernetes (Local/Cluster)
```bash
kubectl apply -f k8s/
```

#### AWS (Terraform)
*Warning: This may incur costs if outside Free Tier.*
```bash
cd infra
terraform init
terraform apply
```

## 📂 Project Structure

```
src/
├── common/         # Shared utilities (Logger, Middleware)
├── modules/        # Feature modules (Todo, Health)
├── infra/          # Infrastructure (Terraform AWS)
├── k8s/            # Kubernetes Manifests
├── app.ts          # Express App Setup
└── server.ts       # Server Entry Point
```

## 🔗 Endpoints

- `GET /health`: Check API status.
- `GET /metrics`: Prometheus metrics.
- `GET /todos`: List all todos.
- `POST /todos`: Create a todo (Body: `{ "title": "..." }`).
- `PATCH /todos/:id`: Update a todo.
- `DELETE /todos/:id`: Delete a todo.
