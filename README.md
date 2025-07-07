# Incident Tracker

A full-stack incident tracking system built with React, Spring Boot, and PostgreSQL. Designed to streamline the reporting and management of incidents across teams with role-based access and Google OAuth login.

---

## 🚀 Features

- **Incident Management** - Add, close, reopen, and delete incidents
- **Role-based Access Control** - Three user roles: `ADMIN`, `USER`, `VIEWER`
- **Google OAuth Integration** - Login restricted to enterprise email domains
- **JWT Authentication** - Secure token-based authentication system
- **Statistics Dashboard** - Visual incident tracking and analytics
- **RESTful API** - Clean API design with Spring Boot and JWT
- **Responsive Design** - Modern UI using React and Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library with Vite build tool
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **@react-oauth/google** - Google OAuth integration

### Backend
- **Spring Boot** - Java web framework
- **PostgreSQL** - Relational database
- **Spring Security** - Authentication and authorization with JWT
- **Maven** - Build tool and dependency management

### Dev & Deployment
- **Vercel** - Frontend hosting and deployment
- **Railway** - Backend hosting and deployment
- **SupaBase** - Managed PostgreSQL database

---

## 🔐 Authentication Flow

The application uses a two-step authentication process to ensure security and restrict access to authorized users:

1.  **Google OAuth Handshake:** The user initiates login on the frontend, which redirects them to Google's OAuth screen. Upon successful login, Google provides an ID Token to the frontend.
2.  **Backend Token Verification:** The frontend sends this Google ID Token to a dedicated endpoint on the Spring Boot backend (e.g., `/api/auth/google`).
3.  **Domain & User Check:** The backend validates the token with Google's servers. It then extracts the user's email and verifies that it belongs to an authorized enterprise domain (e.g., `@your-company.com`), which is configured in the application properties.
4.  **JWT Issuance:** If the user is authorized, the backend either finds the existing user in the PostgreSQL database or creates a new one. It then generates a custom JSON Web Token (JWT) containing the user's ID, email, and role (`ADMIN`, `USER`, or `VIEWER`).
5.  **Secure API Communication:** This JWT is sent back to the React client. The client stores it securely (e.g., in memory or `localStorage`) and includes it in the `Authorization: Bearer <token>` header for all subsequent requests to protected API endpoints. Spring Security validates this JWT on every request.

---

## 📁 Folder Structure
```
incident_tracker/
├── backend/                      # Spring Boot backend
│   ├── mvnw                      # Unix Maven wrapper script
│   ├── mvnw.cmd                  # Windows Maven wrapper
│   ├── pom.xml                   # Maven build config
│   ├── .mvn/
│   │   └── wrapper/
│   │       ├── maven-wrapper.jar
│   │       └── maven-wrapper.properties
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── io/github/raedeon/incidenttracker/
│   │       │       ├── IncidentTrackerApplication.java
│   │       │       ├── config/                 # Spring Security config
│   │       │       │   └── SecurityConfig.java
│   │       │       ├── controller/             # REST controllers
│   │       │       │   ├── GoogleAuthController.java
│   │       │       │   └── TicketController.java
│   │       │       ├── model/                  # Entity models
│   │       │       │   ├── Role.java
│   │       │       │   ├── Ticket.java
│   │       │       │   └── User.java
│   │       │       ├── repository/             # JPA Repositories
│   │       │       │   ├── TicketRepository.java
│   │       │       │   └── UserRepository.java
│   │       │       └── service/                # Service layer
│   │       │           └── TicketService.java
│   │       └── resources/
│   │           └── application.example.properties

├── frontend/                    # React + Vite frontend
│   ├── index.html               # HTML entry point
│   ├── package.json             # NPM dependencies and scripts
│   ├── package-lock.json
│   ├── tailwind.config.js       # Tailwind CSS config
│   ├── vite.config.js           # Vite config
│   ├── tsconfig.json            # TypeScript config
│   ├── postcss.config.js
│   └── src/
│       ├── components/          # Shared UI components
│       ├── pages/               # Dashboard, Login views
│       ├── auth/                # JWT and OAuth handling
│       ├── utils/               # Utility functions
│       ├── services/            # API request handlers
│       ├── styles/              # Tailwind @apply styles
│       ├── types/               # Custom TypeScript types
│       └── assets/              # Images or icons

├── .gitignore
├── .gitattributes
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Java 17+](https://adoptium.net/)
- [PostgreSQL](https://www.postgresql.org/)
- [Maven](https://maven.apache.org/) (or use Maven Wrapper)

### 🖥️ Backend Setup

1. Create the database in PostgreSQL:

```sql
CREATE DATABASE incidents;
```

2. Navigate to the backend directory

```bash
cd backend
```

3. Copy the example config:

```bash
cp src/main/resources/application.example.properties src/main/resources/application.properties
```

4. Edit application.properties with your DB credentials:

```properties
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
```

5. Run the Spring Boot application:

If you have Maven installed globally:
```bash
mvn spring-boot:run
```

Or use the Maven Wrapper (recommended):

On macOS / Linux:
```bash
./mvnw spring-boot:run
```

On Windows:
```bash
mvnw.cmd spring-boot:run
```

The backend will be available at `http://localhost:8080`

6. Verify the backend is running:
```
http://localhost:8080/swagger-ui/index.html
```

### 🌐 Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Create your .env file with your Google OAuth client ID and backend API URL:

```bash
echo "VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com" > .env
echo "VITE_API_BASE_URL=http://localhost:8080" >> .env
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## 🚀 Deployment

### 🌐 Frontend (Vercel)

1. Push your `frontend/` directory to GitHub.
2. Go to [vercel.com](https://vercel.com/) and import the project.
3. Set the following environment variables in Vercel:
```
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_API_BASE_URL=https://your-backend-url.onrailway.app
```
4. Deploy!

### 🗄️ Database (Supabase)

- This project uses [Supabase](https://supabase.com/) for the hosted PostgreSQL database.
- After creating a project, go to:

**Project → Connect**

- Under **"Connection String"**, use the one labelled:

```
Session pooler
```

> ✅ **Required** for platforms like Railway (IPv4-based)  

- Copy these credentials into your Railway backend environmental variables:

```properties
spring.datasource.url=jdbc:postgresql://<host>:5432/<database>
spring.datasource.username=<user>
spring.datasource.password=<your-password>
```

### 🚂 Backend (Railway)

1. Push your `backend/` directory to GitHub.
2. Go to [railway.app](https://railway.app/) and create a new project.
3. Connect your GitHub repo and set the root directory to `backend/`.
4. Set environment variables in Railway:

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:5432/<database>
SPRING_DATASOURCE_USERNAME=<your-db-user>
SPRING_DATASOURCE_PASSWORD=<your-db-password>
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
SPRING_JPA_SHOW_SQL=true
SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI=https://accounts.google.com
```

5. In Deploy Settings, configure:

- Build command:

```bash
./mvnw package
```

- Start command:

```bash
java -jar target/*.jar
```

6. Deploy and test at:

```
https://your-backend-url.onrailway.app/swagger-ui/index.html
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📫 Contact

For questions, suggestions, or collaborations:

📧 j.wang.yujie@gmail.com  
🌐 [github.com/raedeon](https://github.com/raedeon)





