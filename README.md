# Attendance App – Frontend Assignment

In this project, you will build an **Attendance App** with rich features focusing on attendance, leave management, authentication, and insightful stats. This README describes requirements, guidelines, and some suggestions to help you get started.

---

## Objective

Build a functional **Attendance App** using **React + Vite** or **Next.js**. The app should enable employees to log in, log out, apply for leaves, and view stats, while admins can manage users, approve leaves, and set custom events/holidays. Use dummy data for now, but you are encouraged to add a backend if time permits.

---

## General Instructions

- Fork this repo to your GitHub account and keep pushing changes into that repo
- You can use LLMs to generate code, but make sure you can also debug it at a later stage

---

## Core Features

### Authentication

- Secure login/logout functionality.
- User roles: **Employee** and **Admin**.

### Attendance Logging

- Log *in* and *out* for the current day.
- Log missed *in*/*out* for previous days.

### Leave Management

- Users can request leaves, add comments, and specify dates.
- Special leave types for festivals or events (settable by admins).
- Leave approval interface for admins.

### User & Admin Consoles

- Admin dashboard for:
  - User management (add/edit/remove users).
  - Viewing and approving leave requests.
  - Defining special leaves (festivals, events).
- Employee dashboard for:
  - Viewing and submitting leave requests.
  - Attendance statistics and logs.

### Insights & Stats

- Show how many days/hours an employee has worked.
- Track number of leave days taken.
- Display the average log in/log out time.

---

## Bonus (Optional)

- Integrate a simple backend (Node.js/Express, Firebase, etc.).
- Persist authentication, attendance, and leave data.
- Responsive UI/UX improvements.
- Create the necessary Dockerfiles and docker-compose.yml file to make the project environment agnostic.

---

## Technical Requirements

- Use **React + Vite** or **Next.js** (specify your choice in the README).
- State management (context, Redux, or any preferred tool).
- Mock/dummy API or in-memory data store (if no backend).
- Component-based, modular code.
- Clean, readable, and well-commented code.

---

## Getting Started

1. **Clone/Fork this repository**
2. **Install dependencies**:

    ```
    npm install
    ```

3. **Run the dev server**:

    ```
    # For Vite
    npm run dev
    # For Next.js
    npm run dev
    ```

4. **Start coding!**
    - Focus on core features first.
    - Use mock data for users, attendance logs, leave requests, etc.
    - Add backend integration only if you have time.

---

## Suggested Data Models

| Entity        | Fields                                                                              |
|---------------|-------------------------------------------------------------------------------------|
| User          | id, name, email, role (employee/admin), password                                    |
| Attendance    | id, userId, date, loginTime, logoutTime                                             |
| LeaveRequest  | id, userId, type (event/regular), startDate, endDate, status, comments              |
| Event/Leave   | id, name, date(s), description                                                      |

---

## Evaluation Criteria

- Completeness and correctness of features.
- Code quality and maintainability.
- UI/UX: Clean and user-friendly interface.
- Bonus: Extending with a backend or additional polish.

---

## Submission

- Share a public GitHub/GitLab/Bitbucket repository link.
- Include clear instructions on how to run the app.
- Add a demo video or GIF (optional, but appreciated).

---

## Questions?

If you have questions, please document assumptions or queries in a `NOTES.md` file within the project.

---

Good luck – we’re excited to see your creativity, code, and design choices!
