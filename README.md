# 🚀 Keystone - Field Service Management Platform

---

## 📖 Project Overview

**Keystone** is a full-stack service management web application designed specifically for field technicians. This platform streamlines the technician's workflow, allowing them to:

- 📋 View assigned work orders in a centralized dashboard.
- ⚡ Update job statuses (Assigned ➡️ In Progress ➡️ Completed).
- ⏱️ Schedule and log working hours.
- 👤 Manage personal profiles, including custom display names and profile pictures.
- 📤 Submit final project deliverables (Source code, live URLs, videos, and reports) upon job completion.

---

## ✨ Key Features

### 📊 Technician Dashboard
- Visualizes job statistics using interactive summary cards.
- Tracks metrics for **Assigned**, **In Progress**, **Completed**, and **On Hold** jobs.

### 📋 Job Management
- View detailed information about assigned work orders.
- Real-time status updates with intuitive UI feedback.

### 🔄 Status Workflow
- **Start Job:** Moves a job from "Assigned" to "In Progress" with a secure confirmation modal.
- **Log Time:** Once "In Progress," technicians can navigate to a dedicated scheduling page to log work hours.
- **Complete Job:** Marks the task as "Completed" to finalize the assignment.

### 👤 Profile Management
- Update your display name to reflect your real name.
- **Upload a profile picture** directly from your device, which persists across sessions.

### 📤 Project Submission Module
- Upon job completion, technicians can submit a comprehensive project package:
  1. 🔗 Source Code (GitHub/Drive link or file upload)
  2. 🌐 Live Deployment URL
  3. 🎥 Demo Video Link (YouTube/Drive)
  4. 🎬 Feedback Video Link
  5. 📄 Project Report (PDF/Doc upload)
- Fully integrated with a **Spring Boot backend** for persistent database storage.

---

## 🖼️ Application Screenshots

*(Please replace the `src` links below with your actual image URLs. See the "How to add screenshots" section below).*

### 1. Technician Dashboard
![Dashboard Screenshot](https://link-to-your-dashboard-screenshot)

### 2. Job Details & Action Buttons
![Job Details Screenshot](https://link-to-your-job-details-screenshot)

### 3. Time Logs Scheduling Page
![Time Logs Screenshot](https://link-to-your-time-logs-screenshot)

### 4. Profile Page with Image Upload
![Profile Screenshot](https://link-to-your-profile-screenshot)

### 5. Project Submission Modal
![Submission Modal Screenshot](https://link-to-your-submission-modal-screenshot)

---

## 🛠️ Technology Stack

### 🎨 Frontend
| Technology | Purpose |
| :--- | :--- |
| **React.js (TypeScript)** | Core UI Library |
| **React Router DOM** | Page Navigation |
| **Tailwind CSS** | Styling & Layout |
| **Heroicons** | Icons |
| **Axios / Fetch API** | HTTP Requests to Backend |
| **date-fns** | Date Formatting |

### ⚙️ Backend & Database
| Technology | Purpose |
| :--- | :--- |
| **Spring Boot (Java)** | Backend REST API Framework |
| **Spring Data JPA & Hibernate** | Database ORM |
| **MySQL** | Relational Database |

---

## 🚀 How to Run the Project Locally

### 📋 Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [Java JDK 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) installed.
- [MySQL Server](https://dev.mysql.com/downloads/installer/) installed and running.

### 🗄️ Step 1: Setup the MySQL Database
Open your MySQL client (like MySQL Workbench or the command line) and run:
```sql
CREATE DATABASE key_stone_delivery_service;
