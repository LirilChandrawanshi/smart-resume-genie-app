
# Resume Builder API

This is a Spring Boot backend for the Resume Builder application.

## Requirements

- Java 17+
- Maven
- MongoDB

## Setup

1. Clone this repository
2. Configure MongoDB connection in `application.properties`
3. Run the application:
   ```
   mvn spring-boot:run
   ```

## API Endpoints

### Authentication
- POST /api/auth/signup - Register a new user
- POST /api/auth/signin - Login a user

### Resumes
- GET /api/resumes - Get all resumes for the current user
- GET /api/resumes/{id} - Get a specific resume
- POST /api/resumes - Create a new resume
- PUT /api/resumes/{id} - Update a resume
- DELETE /api/resumes/{id} - Delete a resume

## Security

The API uses JWT tokens for authentication. Each request to a protected endpoint should include an Authorization header with a Bearer token.

## Frontend Integration

Update the `src/components/DownloadOptions.tsx` file in your frontend React application to connect to this backend.
