# StockPilot — Architecture

## 1. Architecture Style

StockPilot uses a modular monolith architecture.

The application has one backend deployment and one primary relational
database. Backend business capabilities are separated into independent
modules with clear responsibilities.

We are deliberately avoiding microservices for this project.

## 2. Technology Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- Node.js
- Express
- TypeScript
- REST API

### Database
- PostgreSQL
- Prisma ORM

### Validation and Testing
- Zod
- Vitest
- Supertest
- React Testing Library

### Delivery and Quality
- Docker
- Docker Compose
- GitHub Actions
- ESLint
- Prettier

Additional security and deployment tools will be introduced as the
project develops.

## 3. High-Level Architecture

```text
                 +----------------------+
                 |       Browser        |
                 +----------+-----------+
                            |
                            | HTTP / HTTPS
                            v
                 +----------------------+
                 |    React Frontend    |
                 +----------+-----------+
                            |
                            | REST API
                            v
                 +----------------------+
                 |    Express Backend   |
                 |       /api/v1        |
                 +----------+-----------+
                            |
             +--------------+--------------+
             |              |              |
             v              v              v
       +-----------+  +-----------+  +-------------+
       |   Auth    |  | Products  |  |  Inventory  |
       +-----------+  +-----------+  +-------------+
             |              |              |
             +--------------+--------------+
                            |
                            v
                 +----------------------+
                 |     PostgreSQL       |
                 +----------------------+
