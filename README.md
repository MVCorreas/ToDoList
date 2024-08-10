# ENSOLVERS CHALLENGE - NOTE AND TAG APP

## Description

This project consists of a frontend and a backend developed using Next.js, Express.js, Sequelize, and PostgreSQL. Axios is used for making HTTP requests. Nodemon is utilized for automatic server restarts during development.

## Backend

### Requirements

- Node.js
- npm
- PostgreSQL

### Dependencies

- axios@1.5.1
- concurrently@8.0.1
- cors@2.8.5
- dotenv@16.0.3
- express@4.18.2
- json-server@0.17.3
- morgan@1.10.0
- npm-run-all@4.1.5
- pg@8.11.3
- pg-hstore@2.3.4
- sequelize@6.31.1

### Development Dependencies

- babel@6.23.0
- chai@4.3.10
- mocha@10.2.0
- nodemon@3.0.1
- sequelize-cli@6.6.1
- supertest@6.3.3
- supertest-session@5.0.1

### Installation

1. Install Node.js and npm from [Node.js website](https://nodejs.org/).
2. Install PostgreSQL from [PostgreSQL website](https://www.postgresql.org/download/).
3. Clone the repository: `git clone https://github.com/your-username/your-project.git`.
4. Navigate to the backend directory: `cd server`.
5. Install dependencies: `npm install`.

### Usage

1. Start the backend server: `npm start`.
2. Start the API server: `npm run api`.

## Frontend

### Requirements

- Node.js
- npm

### Dependencies

- axios@1.6.7
- bootstrap@5.3.3
- next@14.1.0
- react@18
- react-bootstrap@2.10.1
- react-dom@18
- react-tabs@6.0.2
- react-type-animation@3.2.0
- react-uuid@2.0.0

### Development Dependencies

- autoprefixer@10.0.1
- eslint@8
- eslint-config-next@14.1.0
- postcss@8
- tailwindcss@3.3.0

### Installation

1. Install Node.js and npm from [Node.js website](https://nodejs.org/).
2. Clone the repository: `git clone https://github.com/your-username/your-project.git`.
3. Navigate to the frontend directory: `cd frontend`.
4. Install dependencies: `npm install`.

### Usage

1. Start the development server: `npm run dev`.


### INSTRUCTIONS TO BUILD THE PROJECT

### 1. Requirements / Intro
You need to implement a simple web application that allows you to take notes, tag, and filter them. The development is divided into two phases:

Phase 1: Note creation
Phase 2: Tag application and filtering
IMPORTANT CONSIDERATIONS:
Phase 1 is mandatory to pass this exercise, while Phase 2 will provide extra points if done.
Content should be persisted in a relational database by using an ORM - in-memory storage or mocks are not allowed.

### 2. Deliverables
To pass this exercise, in addition to the implementation, you must:

Upload the code to a private GitHub repository given by Ensolvers HR staff and use git properly. Both the frontend and the backend should be pushed to that repository, in folders named backend and frontend respectively.
Include a bash/zsh script allowing to run the app. Ideally, the app should start in a Linux/macOS environment just by running one command. This command should set up everything that is required to run the app, like setting up a DB schema, pre-creating any config file, etc.
Include a README.md file describing all the runtimes, engines, tools, etc., required to run the app, with their concrete versions (e.g., npm 18.17, etc).

### 3. Technologies
There is no restriction about the technology to be used, provided that:

Structure the app as a Single Page Web Application (SPA), i.e., frontend and backend are different apps. This is the general case when you use React, Angular, Vue.js, or any other similar UI framework. Please consider that rendering a web page on the server-side (by using JSP, EJS, Smarty, Blade, etc.) but using a bit of JS to, for instance, fetch some data, is not a pure SPA. You need to implement an isolated app, in a separate folder, with its custom package.json and dependencies.
The backend app exposes a REST API for communication with the frontend.
The backend app is separated into layers (e.g., Controllers, Services, DAOs/Repositories). It is important to mention that Laravel (PHP) and Django (Python) DO NOT SUPPORT that layer separation by default when building apps, so if you submit a backend done directly with those technologies without any further adjustment in the architecture, it might probably need to be improved or the exercise will be rejected directly. On the other hand, Spring Boot (Java) and Nestjs (Node.js) are two technologies that enforce and/or ease the use of this layer separation. For more information, you can check the definition of the Service Layer pattern and an example in Spring Boot

### 4. User Stories and Mockups
Phase 1
User Stories
As a user, I want to be able to create, edit, and delete notes.
As a user, I want to archive/unarchive notes.
As a user, I want to list my active notes.
As a user, I want to list my archived notes.
Phase 2
User Stories
As a user, I want to be able to add/remove categories to notes.
As a user, I want to be able to filter notes by category.

### 5. Extra Functional and Non-Functional Requirements
Login: If you provide a login screen, document the default user/password in README.md.
Live deployed version: If you deploy the app (e.g., via Heroku), add the URL of the live running version to README.md.