# Movies API & Frontend 🎬

A full-stack movie review application built using **Spring Boot**, **MongoDB**, **React**, and **Vite**. The application allows users to browse movies, view movie details, and submit reviews through a responsive frontend connected to a RESTful backend API.


---

## Features

### Backend

* RESTful API built with Spring Boot
* MongoDB database integration
* Movie data management
* Review creation and retrieval
* Layered architecture (Controller, Service, Repository, Model)

### Frontend

* React + Vite application
* Axios-based API integration
* Movie listing page
* Movie details page
* Review submission form
* Dynamic review display

---

## Tech Stack

### Backend

* Java
* Spring Boot
* MongoDB
* Maven

### Frontend

* React
* Vite
* Axios
* CSS

---

## Project Structure

```text
moviesApi/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── dev.anamika.movies/
│   │   │       ├── controllers/
│   │   │       ├── models/
│   │   │       ├── repositories/
│   │   │       └── services/
│   │   └── resources/
│
├── movie-frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── styles/
│   └── public/
```
---
## API Endpoints

### Movies

```http
GET /api/v1/movies
GET /api/v1/movies/{imdbId}
```

### Reviews

```http
POST /api/v1/reviews
```
---
## Current Status

✅ Backend Completed

✅ Frontend Completed

✅ MongoDB Integration

✅ Review System Implemented

---

Still under development 🚧