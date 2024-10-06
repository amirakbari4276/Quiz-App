# Online Exam Platform

## Overview

This is a Vue.js-based online exam platform where users can log in, take exams, and see their scores. The platform supports user registration, login, and logging out. Each user can view a list of available exams, take them, and see their results. The admin can manage user data and exam questions through a local JSON server.

## Features

- User registration and authentication (login/logout)
- Multiple exams and questions
- Real-time score calculation
- Persistent user data
- Responsive design
- Axios for HTTP requests
- Vuex for state management

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12.x or above)
- [Vue CLI](https://cli.vuejs.org/)
- [JSON Server](https://www.npmjs.com/package/json-server) for handling the local database

## Project Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/online-exam-platform.git
cd online-exam-platform
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start JSON Server
Before running the project, make sure the JSON server is running for handling the mock data. In the root directory, run:
```bash
npx json-server --watch db.json --port 3000
```
This will start the JSON server on http://localhost:3000.

### Step 4: Start the Development Server
To start the Vue.js development server, run:

```bash
npm run dev
```
The application should be available at http://localhost:5173.

## Project Structure
```bash

├── public/                     
├── src/                       
│   ├── assets/                 
│   │   ├── base.css            
│   │   ├── main.css            
│   ├── components/             
│   │   ├── ExamView.vue        
│   │   ├── Options.vue         
│   │   ├── Question.vue     
│   ├── router/                
│   │   └── index.js           
│   ├── store/                
│   │   └── store.js            
│   ├── views/                
│   │   └── Exam.vue            
│   │   └── Home.vue            
│   │   └── Login.vue            
│   │   └── Register.vue            
│   ├── App.vue                 
│   ├── main.js                 
├── db.json                     
└── package.json                
└── README.md                
```
