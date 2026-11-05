# StockPilot

StockPilot is a full-stack inventory management application for
small and medium-sized businesses.

It provides product management, supplier management, inventory
tracking, purchase orders, and an auditable history of stock changes.

## Project Status

**Status:** In development

This project is being built incrementally, starting with the
requirements and architecture before implementation.

## Planned Features

- User authentication and role-based authorization.
- Inventory dashboard.
- Product and category management.
- Supplier management.
- Stock-in, stock-out, and adjustment operations.
- Purchase order management.
- Inventory movement history.
- Automated testing.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod |
| Testing | Vitest, Supertest, React Testing Library |
| Containers | Docker, Docker Compose |
| CI/CD | GitHub Actions |

## Architecture

StockPilot follows a modular monolith architecture.

The frontend communicates with a versioned REST API. The backend
is divided into business modules, and PostgreSQL stores application
data.

See:
- [Product Requirements](docs/requirements.md)
- [Architecture](docs/architecture.md)

## Getting Started

Setup instructions will be added as the application foundation
and development environment are implemented.

## Development Goals

This project focuses on practical software engineering:
- Clean and maintainable architecture.
- Reliable database operations.
- Secure authentication and authorization.
- Data validation and error handling.
- Automated testing.
- Containerization and CI/CD.
- Application security.

## License

License to be determined.
