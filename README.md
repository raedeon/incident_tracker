# Incident Tracker

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://adoptium.net/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot-green.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/Frontend-React-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue.svg)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind_CSS-38B2AC.svg)](https://tailwindcss.com/)
[![AWS](https://img.shields.io/badge/Hosting-AWS-yellow.svg)](https://aws.amazon.com/)

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
- **Amazon S3** - Static frontend hosting
- **Amazon CloudFront** - Global CDN and reverse proxy for frontend and backend
- **AWS Elastic Beanstalk** - Managed environment for the Spring Boot application
- **Amazon RDS** - Managed PostgreSQL database
- **Amazon VPC** - Virtual Private Cloud for secure networking

---

## 🔐 Authentication Flow

The application uses a two-step authentication process to ensure security and restrict access to authorized users:

1.  **Google OAuth Handshake:** The user initiates login on the frontend, which redirects them to Google's OAuth screen. Upon successful login, Google provides an ID Token to the frontend.
2.  **Backend Token Verification:** The frontend sends this Google ID Token to a dedicated endpoint on the Spring Boot backend (e.g., `/api/auth/google`).
3.  **Domain & User Check:** The backend validates the token with Google's servers. It then extracts the user's email and verifies that it belongs to an authorized enterprise domain (e.g., `@your-company.com`), which is configured in GoogleAuthController.
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

This application is designed for a professional, scalable deployment on **Amazon Web Services (AWS)**, utilizing a reverse proxy architecture for enhanced security and performance.

The architecture consists of:
- **Networking (VPC):** Securely isolated network with firewall rules (Security Groups).
- **Database (Amazon RDS):** A private, managed PostgreSQL database instance.
- **Backend (AWS Elastic Beanstalk):** A managed environment for the Spring Boot application.
- **Frontend (Amazon S3 & CloudFront):** A static website hosted on S3 and delivered globally via the CloudFront CDN, which also acts as a reverse proxy for the backend.

### 🔧 Deployment Prerequisites

Before you begin, you will need:

-   An **AWS Account** with administrative access.
-   The **AWS CLI** installed and configured on your local machine. (optional)
-   Your **Google OAuth Client ID** ready.

---

### 1. 🔐 Networking & Security (Security Groups)

First, create the firewall rules that will allow your services to communicate securely.

1.  Navigate to the **VPC** service in the AWS Console.
2.  Go to **Security Groups** and create two new groups in your default VPC:
    1.  **Backend Security Group (`backend-sg`):**
        -   This group will contain your Elastic Beanstalk application server. It needs an inbound rule that allows HTTP traffic from the internet (which Elastic Beanstalk will manage).
    2.  **Database Security Group (`db-sg`):**
        -   This group will contain your RDS database.
        -   Add an **Inbound rule** with the following settings:
            -   **Type:** `PostgreSQL`
            -   **Port:** `5432`
            -   **Source:** Select your `backend-sg`.
        -   This ensures only your backend application can connect to the database.

---

### 2. 🗄️ Database (Amazon RDS)

1.  Navigate to the **RDS** service and click **Create database**.
2.  Choose **Standard create** and **PostgreSQL**.
3.  Select the **Free tier** template to avoid costs.
4.  **Settings:**
    -   **DB instance identifier:** `incident-tracker-db`
    -   Set your **Master username** and **password**.
5.  **Connectivity:**
    -   **Public access:** Set to **No**. This is critical for security.
    -   **VPC security group:** Choose **Choose existing** and select your `db-sg`.
6.  Create the database. Once it's available, **copy the database Endpoint**.

---

### 3. 🚂 Backend (AWS Elastic Beanstalk)

1.  **Package the Application:** In your `backend/` directory, run `mvn clean package` to create the `.jar` file.
2.  Navigate to **Elastic Beanstalk** and **Create a new environment**.
3.  **Configure Environment:**
    -   **Environment tier:** `Web server environment`
    -   **Application name:** `incident-tracker`
    -   **Platform:** `Java` (select a recent Corretto version)
    -   **Application code:** `Upload your code` and select the `.jar` file from your `backend/target/` directory.
    -   **Presets:** `Single instance (Free Tier eligible)`
4.  **Configure Service Access:** Use the default settings to create new service roles.
5.  **Set up Networking:**
    -   Select your VPC.
    -   Under **Instance settings**, for **EC2 security groups**, remove the default and add your `backend-sg`.
6.  **Configure Instance Properties:**
    -   Under **Configure instance traffic and scaling**, find the **Environment properties** section.
    -   Add the following properties:
        ```env
        # Database Credentials
        SPRING_DATASOURCE_URL=jdbc:postgresql://<YOUR_RDS_ENDPOINT>:5432/incidents
        SPRING_DATASOURCE_USERNAME=<your-rds-master-username>
        SPRING_DATASOURCE_PASSWORD=<your-rds-master-password>
        
        # Spring Security JWT Validation
        SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI=https://accounts.google.com
        SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_AUDIENCE=<YOUR_GOOGLE_OAUTH_CLIENT_ID>
        
        # Server Port Configuration
        SERVER_PORT=5000
        ```
7.  **Review and Launch.** Once the environment is healthy, **copy the environment's URL**.

---

### 4. 🌐 Frontend (Amazon S3 & CloudFront)

1.  **Prepare the Frontend:**
    -   In your `frontend/.env` file, set the API base URL to a relative path:
        ```env
        VITE_API_BASE_URL=""
        ```
    -   Run `npm run build` in the `frontend/` directory.

2.  **Configure S3 Bucket:**
    -   Navigate to the **S3** service and **Create bucket**.
    -   Give it a unique name (e.g., `incident-tracker-frontend-yourname`).
    -   Keep **Block all public access** checked.
    -   Upload the entire contents of your `frontend/dist/` folder to the bucket.

3.  **Configure CloudFront Distribution:**
    -   Navigate to **CloudFront** and **Create a distribution**.
    -   **Configure Origins:**
        1.  **Primary Origin (S3):**
            -   **Origin domain:** Select your S3 bucket.
            -   **Origin access:** Select **Origin access control settings (recommended)** and create a new OAC. Click the **Copy policy** button and apply this policy to your S3 bucket's permissions to lock it down.
        2.  **Secondary Origin (Backend):**
            -   **Origin domain:** Paste your **Elastic Beanstalk URL** (e.g., `http://incident-tracker-env...`).
            -   **Protocol:** `HTTP only`.
    -   **Configure Behaviors:**
        1.  **Create an API Behavior (Precedence 0):**
            -   **Path pattern:** `/api/*`
            -   **Origin:** Select your **Elastic Beanstalk origin**.
            -   **Cache policy:** `Managed-CachingDisabled`.
            -   **Origin request policy:** `AllViewerExceptHostHeader`.
        2.  **Edit the Default Behavior (Precedence 1):**
            -   **Path pattern:** `Default (*)`
            -   **Origin:** Select your **S3 origin**.
    -   **Launch the distribution.** Once deployed, the **Distribution domain name** is your final public URL.

4.  **Final Step:** Update your **Google OAuth Credentials** to add the new CloudFront domain name to the list of authorized JavaScript origins.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📫 Contact

For questions, suggestions, or collaborations:

📧 j.wang.yujie@gmail.com  
🌐 [github.com/raedeon](https://github.com/raedeon)





