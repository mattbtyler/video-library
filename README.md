# Video Library

Youtube video link library

## Environment

Developed using Node.js 20
Follow the Installation guide to install NVM
https://github.com/nvm-sh/nvm

Install Node 20

```bash
$ nvm install 20
```

# SETUP

## Backend Setup

```bash
cd backend
npm install
```

### MySql setup using docker

Make sure docker is running on system
Start Docker container

```bash
# Start container
$ docker-compose up -d
```

### OR use SQLite

Modify `src/app.module.ts` to use SQLite module instead of mysql

E2E test can be tested by run

```bash
npm run test:e2e
```

You can also import my test collection for validating API using the `Insomnia-Collection.json` file.

## Frontend Setup

Open a new terminal

### Setup

```bash
cd frontend
npm install
```

### Run development server

```bash
npm run dev
```
