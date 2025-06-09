# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Prerequisites

Make sure the following are installed before working with this project:

- [Node.js](https://nodejs.org/) (which includes `npm`)
- [PostgreSQL](https://www.postgresql.org/) database server

## Getting started

Install dependencies first:

```bash
npm install
```

### Running the project

Start the backend API in one terminal:

```bash
npm run server
```

Then start the frontend in another terminal:

```bash
npm run dev
```

The Vite dev server proxies requests beginning with `/api` to
`http://localhost:3001`, allowing the React application to communicate with
the Express backend during development.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Server Setup

The project includes a small Express server located in the `server/` directory. Use `npm run server` to start it.

### Database configuration

The server expects PostgreSQL credentials to be provided via environment variables:

- `PGHOST`
- `PGPORT`
- `PGUSER`
- `PGPASSWORD`
- `PGDATABASE`

Create a `.env` file or export these variables in your shell before starting the server.
The backend now uses `dotenv` to automatically load variables from a `.env` file during local development.

### Creating the contacts table

Run this SQL once in your PostgreSQL database before launching the server:

```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  nom TEXT,
  prenom TEXT,
  adresse TEXT,
  email TEXT,
  telephone TEXT,
  date_creation TIMESTAMP
);
```


# postegresql-form

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    adresse TEXT NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telephone VARCHAR(20) NOT NULL,
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

```sql
INSERT INTO users (nom, prenom, adresse, email, telephone)
VALUES
  ('Dupont', 'Jean', '12 rue des Fleurs, 75000 Paris', 'jean.dupont@email.com', '0102030405'),
  ('Martin', 'Claire', '45 avenue des Champs, 69000 Lyon', 'claire.martin@email.com', '0203040506'),
  ('Nguyen', 'Minh', '78 boulevard du Midi, 13000 Marseille', 'minh.nguyen@email.com', '0304050607'),
  ('Moreau', 'Luc', '5 rue Victor Hugo, 31000 Toulouse', 'luc.moreau@email.com', '0405060708'),
  ('Legrand', 'Sophie', '22 place Bellecour, 69002 Lyon', 'sophie.legrand@email.com', '0506070809');
  
```