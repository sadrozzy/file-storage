# File Storage

## Introduction

This project is a file storage application built using a modern web development stack. The project uses Shadcn UI for the frontend interface, Next.js for the frontend framework, NestJS for the backend framework, PostgreSQL as the database, and Prisma ORM for database interactions.

Project stack:
- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Nest.js](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma ORM](https://www.prisma.io/)
- **UI Kit**: [Shadcn UI](https://github.com/shadcn/ui)

## Getting Started

- [Installation](#installation)
  - [Server](#server)
  - [Client](#client)
- [Usage](#usage)
  - [Server](#server-1)
  - [Client](#client-1)
- [Features](#features)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Installation

### Server

1. Fill in the `.env` file in the `server` directory with the following content:

    ```env
    DATABASE_URL="postgresql://user:password@host:port/database_name?schema=public"
    JWT_SECRET="AnyString"
    JWT_SECRET_REFRESH="AnyString"
    CLIENT_URL="http://localhost:3000"
    ```

2. Install dependencies:

    ```bash
    pnpm i
    # or
    npm i
    # or
    yarn i
    ```

3. Prepare the database:

    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

4. Start the server:

    ```bash
    pnpm run start:dev
    # or
    npm start dev
    # or
    yarn start dev
    ```

    - Backend URL: `http://localhost:4000/api/`
    - Swagger Documentation: `http://localhost:4000/docs`

### Client

1. Fill in the `.env` file in the `client` directory with the following content:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:4000/
    NEXT_PUBLIC_STATIC_URL=http://localhost:4000/uploads
    API_URL=localhost
    ```

2. Start the client:

    ```bash
    pnpm run dev
    # or
    npm start dev
    # or
    yarn start dev
    ```

    - Website URL: `http://localhost:3000`

## Usage

### Server

- Access the backend at `http://localhost:4000/api/`.
- View the Swagger documentation at `http://localhost:4000/docs`.

### Client

- The website is available at `http://localhost:3000`.

## Features

- File upload and storage
- User authentication with JWT
- API documentation with Swagger

## Configuration

Ensure that the environment variables are correctly set in the `.env` files for both the server and client as described in the [Installation](#installation) section.

## Documentation

- API documentation is available at `http://localhost:4000/docs`.

## Troubleshooting

- Ensure that PostgreSQL is running and accessible using the credentials provided in the `.env` file.
- Verify that the environment variables are correctly set.
- Check the logs for any error messages and follow the instructions.

## Contributors

- [sadrozzy](https://github.com/sadrozzy)

## License

This project is licensed under the MIT License.
