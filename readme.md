# Project Starter

A project starter designed to streamline the setup process for new projects. Fork this repository to quickly initiate your projects without hassle.

## Usage

1. Fork this repository.
2. Clone the forked repository to your local machine.
3. Install dependencies using your preferred package manager (`pnpm install` or `yarn install` or `npm install` ).
4. Run the development server with `pnpm start` or `yarn start` or `npm start`.
5. Begin coding your awesome project!

## Technologies Used

- Vercel node code compiler bundler, fast and powerful
- TypeScript, to uncover errors more quickly
- Express, to easy create node server
- ESLint, Prettier, to keep a beautiful code
- Vitest, to test our functions and logics
- Cors, to congigure correctly request source
- MariaDB, Database manager correctly configurated

## Other details :

- Practical npm scripts to automate some tasks
- Nodemon configuration adapted to this project

## Dependencies

List of major dependencies used in the project:

- `@stylistic/eslint-plugin`
- `@types/...`
- `@vercel/ncc`
- `cors`
- `dotenv`
- `eslint`
- `express`
- `mariadb`
- `nodemon`
- `prettier`
- `ts-node`
- `typescript`
- `vitest`

## Scripts

- `start`: Run the development server using nodemon.
- `test`: Run tests using Vitest.
- `update`: Update project dependencies.
- `prettier`: Format source code using Prettier.
- `lint`: Run ESLint on TypeScript files and report error.
- `lint & fix`: Run ESLint on TypeScript files, fix fixable issues.
- `build`: Build the project using TypeScript and Vercel/ncc.
- `build-run`: Preview the built project using Vercel/ncc.
- `clean`: Remove the `build` directory.
- `clean:all`: Remove both `build` and the `node_modules` directory.

## Project Structure

```
starter-vite-nodejs-typescript-express
├─ src/
│  ├─ controllers/
│  ├─ models/
│  ├─ tests/
│  ├─ types/
│  ├─ utilities/
│  ├─ database.ts
│  ├─ router.ts
│  └─ server.ts
│
├─ .env
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc
├─ index.ts
├─ nodemon.json
├─ package.json
├─ pnpm-lock.yaml
├─ readme.md
├─ testRequest.http
└─ tsconfig.json
```