# JSON Placeholder REST API

A full-stack application that provides a CRUD REST API for posts, retrieving data from the [JSON Placeholder Service](https://jsonplaceholder.typicode.com/posts) with a professional ReactJS frontend.

## Author

**yassine abbou**

## Technologies Used

### Backend
- Java 17
- Spring Boot 3.4.5
- Spring Web
- Lombok
- JUnit 5 & Mockito for testing

### Frontend
- React 18
- Axios for API calls
- React Bootstrap for UI components
- React Hooks (useState, useEffect, useContext)
- Context API for state management

## Project Structure

### Backend Structure

```
src/
├── main/
│   ├── java/
│   │   └── net/
│   │       └── yassine/
│   │           └── rest/
│   │               ├── config/
│   │               │   └── AppConfig.java
│   │               ├── controller/
│   │               │   └── PostController.java
│   │               ├── exception/
│   │               │   └── GlobalExceptionHandler.java
│   │               ├── model/
│   │               │   └── Post.java
│   │               ├── service/
│   │               │   └── PostService.java
│   │               └── RestApplication.java
│   └── resources/
│       └── application.properties
└── test/
    └── java/
        └── net/
            └── yassine/
                └── rest/
                    ├── controller/
                    │   └── PostControllerTest.java
                    └── RestApplicationTests.java
```

### Frontend Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
└── src/
    ├── components/
    │   ├── DeleteConfirmation.js
    │   ├── LoadingSpinner.js
    │   ├── Pagination.js
    │   ├── PostForm.js
    │   ├── PostItem.js
    │   ├── PostList.js
    │   └── SearchBar.js
    ├── context/
    │   └── PostContext.js
    ├── services/
    │   └── api.js
    ├── App.css
    ├── App.js
    ├── index.css
    └── index.js
```

## API Endpoints

| HTTP Method | Endpoint | Description |
|-------------|----------|-------------|
| GET | /api/posts | Get all posts |
| GET | /api/posts/{id} | Get a post by ID |
| POST | /api/posts | Create a new post |
| PUT | /api/posts/{id} | Update a post |
| DELETE | /api/posts/{id} | Delete a post |

## Request/Response Examples

### Get All Posts

```
GET /api/posts
```

Response:
```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "id": 2,
    "userId": 1,
    "title": "qui est esse",
    "body": "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
  }
]
```

### Get Post by ID

```
GET /api/posts/1
```

Response:
```json
{
  "id": 1,
  "userId": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
}
```

### Create Post

```
POST /api/posts
Content-Type: application/json

{
  "userId": 1,
  "title": "New Post Title",
  "body": "New Post Body"
}
```

Response:
```json
{
  "id": 101,
  "userId": 1,
  "title": "New Post Title",
  "body": "New Post Body"
}
```

### Update Post

```
PUT /api/posts/1
Content-Type: application/json

{
  "userId": 1,
  "title": "Updated Title",
  "body": "Updated Body"
}
```

Response:
```json
{
  "id": 1,
  "userId": 1,
  "title": "Updated Title",
  "body": "Updated Body"
}
```

### Delete Post

```
DELETE /api/posts/1
```

Response: 204 No Content

## How to Run

### Backend

1. Clone the repository
2. Navigate to the project directory
3. Run the backend application using Maven:
   ```
   ./mvnw spring-boot:run
   ```
4. The API will be available at `http://localhost:8080/api/posts`

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. The React application will open in your browser at `http://localhost:3000`

Note: The frontend is configured to proxy API requests to the backend at `http://localhost:8080`, so make sure the backend is running before starting the frontend.

## How to Test

### Backend Tests

Run the backend tests using Maven:
```
./mvnw test
```

### Frontend Tests

Navigate to the frontend directory and run the tests:
```
cd frontend
npm test
```

This will run the React testing suite and show the test results in the console.

## Error Handling

### Backend Error Handling

The API includes comprehensive error handling:

- 404 Not Found: When a requested resource doesn't exist
- 503 Service Unavailable: When the external JSON Placeholder service is unavailable
- 500 Internal Server Error: For unexpected errors

Each error response includes a timestamp, status code, error type, message, and path.

### Frontend Error Handling

The React application includes comprehensive error handling:

- Loading states: Displays a spinner while data is being fetched
- Error messages: Shows user-friendly error messages when API calls fail
- Empty states: Displays appropriate messages when no posts are available
- Form validation: Validates user input in create/edit forms
- Toast notifications: Shows success/error messages after operations
- Confirmation dialogs: Asks for confirmation before destructive actions
