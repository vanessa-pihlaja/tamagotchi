# Tamagotchi-Inspired Game

A simple full-stack web app where you care for a virtual creature — inspired by classic Tamagotchi-style games. You can feed, play with, and let your creature sleep. These actions affect its happiness, energy, and health over time.

## Technologies

### Frontend:
- React
- TypeScript
- Styled-components
- URQL

### Backend:
- Node.js
- Express
- GraphQL
- SQLite3
- TypeScript


## Running the Project Locally

### 1. Install required tools
Make sure you have:
- nvm
- yarn

### 2. Set up the project
```nvm use```
```yarn install```
💡 If sqlite3 install fails, make sure Python is available in your PATH.

### 3. Start the servers
Start the backend
```yarn workspace server start```

In another terminal, start the frontend
```yarn workspace ui start```
