🚀 KeyStone -Field - Service-Management-Platform
📖 Project Overview
My project is a full-stack service management web application designed for field technicians. It allows technicians to view assigned jobs, update work order statuses, log working hours, manage their personal profile, and submit final project deliverables upon completion.

✨ Key Features
Technician Dashboard: Visualizes job statistics (Assigned, In Progress, Completed, On Hold) with interactive summary cards.

Job Management: View assigned work orders, track status, and view detailed job information.

Status Workflow:

Start Job: Moves a job from "Assigned" to "In Progress" with a user-friendly confirmation modal.

Log Time: Once "In Progress", a dedicated button allows the technician to schedule and log work hours.

Complete Job: Marks the job as "Completed".

Profile Management: Technicians can update their display name and upload a profile picture, which persists across sessions.

Project Submission: Upon job completion, technicians can submit a full project package including Source Code links, Live Deployment URLs, Demo videos, Feedback videos, and Report files.

🖼️ Application Screenshots
(Instructions to add screenshots are provided below)

1. Technician Dashboard
https://link-to-your-dashboard-screenshot

2. Job Details & Action Buttons
https://link-to-your-job-details-screenshot

3. Time Logs Scheduling
https://link-to-your-time-logs-screenshot

4. Profile Page with Image Upload
https://link-to-your-profile-screenshot

5. Project Submission Modal
https://link-to-your-submission-modal-screenshot

🛠️ Technology Stack
Frontend
React.js (with TypeScript)

React Router DOM (Navigation)

Tailwind CSS (Styling)

Heroicons (Icons)

Axios / Fetch API (HTTP Requests)

date-fns (Date formatting)

Backend
Spring Boot (Java)

Spring Data JPA & Hibernate (Database ORM)

MySQL (Relational Database)

📂 Project Structure

Frontend Structure:
/src
 ├── /Components
 │    ├── /Common            # Reusable UI elements (Badges, Modals)
 │    ├── /Technician        # Page-specific components (Dashboard, JobDetails)
 │    └── /Auth              # Login & Registration components
 ├── /Context                # AuthContext (User state management)
 ├── /Pages                  # Full page views (TimeLogs, Profile)
 ├── /Services               # API service calls (JobService)
 ├── /Types                  # TypeScript type definitions
 └── App.tsx                 # Main routing configuration

Backend Structure:
 /src/main/java/com/keystone/deliverableservice
 ├── /Controller             # REST API Endpoints (WorkOrderController)
 ├── /Service                # Business Logic (WorkOrderService)
 ├── /Repository             # Database interactions (WorkOrderRepository)
 ├── /Entity                 # Database Tables (WorkOrder)
 └── /DTO                    # Data Transfer Objects

