# JSON Placeholder REST API

A Spring Boot application that provides a full CRUD REST API for posts, retrieving data from the [JSON Placeholder Service](https://jsonplaceholder.typicode.com/posts).

## Author

**yassine abbou**

## Technologies Used

- Java 17
- Spring Boot 3.4.5
- Spring Web
- Lombok
- JUnit 5 & Mockito for testing

## Project Structure

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

1. Clone the repository
2. Navigate to the project directory
3. Run the application using Maven:
   ```
   ./mvnw spring-boot:run
   ```
4. The API will be available at `http://localhost:8080/api/posts`

## How to Test

Run the tests using Maven:
```
./mvnw test
```

## Error Handling

The API includes comprehensive error handling:

- 404 Not Found: When a requested resource doesn't exist
- 503 Service Unavailable: When the external JSON Placeholder service is unavailable
- 500 Internal Server Error: For unexpected errors

Each error response includes a timestamp, status code, error type, message, and path.
