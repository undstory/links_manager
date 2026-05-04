# Link Manager

Fullstack web application for managing saved links with categories, tags
and reading status tracking.

The goal of this project is to build a clean, scalable link management
tool using a modern JavaScript stack and solid backend architecture.

## Tech Stack

### Frontend

- React (Vite)
- TypeScript
- SCSS + CSS Modules
- React Router

### Backend

- Node.js
- Express
- Prisma ORM
- MySQL

## Features

### Link Management DONE

- Add, edit and delete links DONE
- Custom description for each link DONE
- Reading status: DONE
  - `To Read`
  - `Read`
- Mark as Favorite DONE

### Categories & Tags IN PROGRESS

- Assign one category per link DONE
- Assign multiple tags (many-to-many relation) DONE
- Create and manage categories DONE
- Create and manage tags DONE
- Display most popular categories and tags

### Dashboard IN PROGRESS

- Quick statistics:
  - Total links
  - Read vs unread ratio
  - Favorites count
- Charts:
  - Read vs unread (Donut chart)
  - Links added over time
- Most popular categories
- Most popular tags
- Recently added links DONE

### Filtering & Search TODO

- Filter by status
- Filter by category
- Filter by tags
- Search by title or description
- Sort by newest / oldest / alphabetical

## Architecture

The application is structured as a monorepo:

link_manager/ ├── server/ → Express + Prisma + MySQL └── client/ →
React + Vite

Backend and frontend run independently and communicate via REST API.

## Database Highlights

- Enum-based link status
- Many-to-many relation for tags
- Indexed fields for filtering and sorting
- Aggregations for dashboard statistics

## Project Goals

- Practice fullstack architecture!
- Work with relational data and Prisma
- Build reusable UI components with CSS Modules
- Implement real-world dashboard statistics
- Create a clean and scalable project structure
- Add tests!

## Possible Future Improvements

- User authentication (multi-user support)

## Setup

### Backend

cd server\
npm install\
npx prisma migrate dev\
npm run dev

### Frontend

cd client\
npm install\
npm run dev

## Status

In active development.

This project focuses on clean architecture, thoughtful UI design and
real-world data modeling.
