# 📝 QuickNotes - Smart Note Taking App  

<p align="center">
  <a href="https://note-taking-app-three-theta.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-3393FF?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/Ad-cmd-1976/Note-Taking-App.git" target="_blank">
    <img src="https://img.shields.io/badge/View%20Code-181717?style=for-the-badge&logo=github&logoColor=white" alt="View Code" />
  </a>
</p>  

QuickNotes is a secure and minimalistic full-stack note-taking application built with the MERN stack. It allows users to create, organize, and manage notes efficiently with authentication and protected routes.  

![Project Screenshot](https://github.com/user-attachments/assets/1e46b5c0-4a1b-4ac4-9008-b313239d1280)  

---  

## ✨ Features  

- **Create & Manage Notes:** Add, view, and delete personal notes.  
- **Protected Routes:** Only authenticated users can access their notes.  
- **Secure Authentication:** Custom login system using JWT.  
- **User-specific Notes:** Every user can only access their own notes.  
- **Responsive UI:** Works seamlessly on desktop and mobile.  
- **Fast Performance:** Lightweight and optimized for quick use.  

---  

## 🛠️ Tech Stack  

- **Frontend:** React, Zustand, Axios, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Deployment:** Vercel (Frontend), Render (Backend)  

---  

## ⚙️ Setup and Installation  

To set up this project locally, follow these steps:  

```sh
# 1. Clone the repository into your desired directory
git clone https://github.com/Ad-cmd-1976/Note-Taking-App.git

# 2. Navigate into the project's root folder
cd Note-Taking-App

# 3. Create a .env file in the backend directory.
    # Add the following environment variables:
        PORT=8080
        MONGO_URI=your_mongodb_uri

        JWT_SECRET=your_access_token_secret
        EMAIL_USER=your_email_user
        EMAIL_PASS=your_email_pass

# 4. Run the application
    # Start the backend
      cd backend
      npm run dev
    # Start the frontend
      cd frontend
      npm run dev
# 5. Access the application at localhost:5173
