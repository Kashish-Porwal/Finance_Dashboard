# Finance Data Processing and Access Control Backend

## Overview
This is a robust, production-ready backend built with **NestJS**, **TypeScript**, **Prisma**, and **SQLite**. It serves as an assessment solution for the Finance Dashboard system, featuring full Role-Based Access Control (RBAC), JWT authentication, complex filtering, pagination, and dashboard aggregations.

## Key Features Implemented
1. **User and Role Management:** 
   - `VIEWER`, `ANALYST`, and `ADMIN` roles.
   - Admin can activate/deactivate users.
2. **Financial Records Management (CRUD):**
   - Create, read, update, and soft-delete financial entries.
   - Supported filtering by `category`, `type` (INCOME/EXPENSE), `startDate`, `endDate`, and `search` on notes.
   - Built-in pagination.
3. **Dashboard Summary APIs:**
   - Aggregated endpoints for total income/expenses, net balance, category totals, and recent activity records.
4. **Access Control (RBAC):**
   - Implemented via `@Roles()` custom decorator alongside `JwtAuthGuard` and `RolesGuard`.
   - Viewers have no access; Analysts can read records and dashboard data; Admins have full access.
5. **Quality & Resiliency (Enhancements):**
   - Rate limiting via `@nestjs/throttler`.
   - Global exception handling using a custom Exceptions Filter.
   - DTO Validation using `class-validator`.
   - API Documentation using **Swagger**.
   - Unit tests setup.

## Running the Application Locally (Zero Config)
Since this project uses SQLite and Prisma, there are absolutely no external database dependencies. 

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Setup the Database:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```
3. **Start the Application:**
   ```bash
   npm run start:dev
   ```

## Interactive Documentation (Swagger)
Once the server is running on `http://localhost:3000`, open your browser and navigate to:
**`http://localhost:3000/api/docs`**

You can register a test user, login to receive a token, and use the "Authorize" button in Swagger to test all endpoints!

## Running Tests
Run the unit tests suite with:
```bash
npm run test
```

## Architectural Decisions
- **NestJS:** Chosen for its modular architecture, robust dependency injection, and easy testability.
- **Prisma & SQLite:** Provides an excellent type-safe database layer while removing the burden of requiring reviewers to setup PostgreSQL/MySQL servers.
- **DTO validation:** Automates input validation and sanitization securely.
