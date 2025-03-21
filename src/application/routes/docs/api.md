# Bookstore API Documentation

Base URL: `http://bookstore-dev-ALB-285994819.us-east-1.elb.amazonaws.com:80`

## Table of Contents
- [Status Endpoint](#status-endpoint)
- [Book Endpoints](#book-endpoints)
  - [Add Book](#add-book)
  - [Update Book](#update-book)
  - [Retrieve Book](#retrieve-book)
- [Customer Endpoints](#customer-endpoints)
  - [Add Customer](#add-customer)
  - [Retrieve Customer by ID](#retrieve-customer-by-id)
  - [Retrieve Customer by User ID](#retrieve-customer-by-user-id)

---

## Status Endpoint

### GET /status

Check if the API is operational.

**Response:**
- **Content-Type:** `text/plain`
- **Status Code:** 200 OK
- **Body:** `OK`

---

## Book Endpoints

### Add Book

**Endpoint:** `POST /books`

Adds a new book to the system. The ISBN will be the unique identifier for the book.

**Request Body:**
```json
{
    "ISBN": "978-0321815736",
    "title": "Software Architecture in Practice",
    "Author": "Bass, L.",
    "description": "seminal book on software architecture",
    "genre": "non-fiction",
    "price": 59.95,
    "quantity": 106
}
```

**Validation:**
- All fields are mandatory
- Price must be a valid number with 2 decimal places

**Responses:**

*Successful book creation:*
- **Status Code:** 201 Created
- **Headers:** Location: `/books/{ISBN of the new book}`
- **Body:**
```json
{
    "ISBN": "978-0321815736",
    "title": "Software Architecture in Practice",
    "Author": "Bass, L.",
    "description": "seminal book on software architecture",
    "genre": "non-fiction",
    "price": 59.95,
    "quantity": 106
}
```

*ISBN already exists:*
- **Status Code:** 422 Unprocessable Entity
- **Body:**
```json
{
    "message": "This ISBN already exists in the system."
}
```

*Invalid input:*
- **Status Code:** 400 Bad Request

---

### Update Book

**Endpoint:** `PUT /books/{ISBN}`

Updates the information of an existing book in the system.

**URL Parameters:**
- `ISBN` (required): ISBN of the book to update

**Request Body:**
```json
{
    "ISBN": "978-0321815736",
    "title": "Software Architecture in Practice",
    "Author": "Bass, L.",
    "description": "seminal book on software architecture",
    "genre": "non-fiction",
    "price": 59.95,
    "quantity": 99
}
```

**Validation:**
- All fields are mandatory
- Price must be a valid number with 2 decimal places

**Responses:**

*Successful update:*
- **Status Code:** 200 OK
- **Body:**
```json
{
    "ISBN": "978-0321815736",
    "title": "Software Architecture in Practice",
    "Author": "Bass, L.",
    "description": "seminal book on software architecture",
    "genre": "non-fiction",
    "price": 59.95,
    "quantity": 99
}
```

*ISBN not found:*
- **Status Code:** 404 Not Found

*Invalid input:*
- **Status Code:** 400 Bad Request

---

### Retrieve Book

**Endpoints:** 
- `GET /books/isbn/{ISBN}`
- `GET /books/{ISBN}`

Both endpoints produce the same response. Returns a book with the specified ISBN.

**URL Parameters:**
- `ISBN` (required): ISBN of the book to retrieve

**Responses:**

*Success:*
- **Status Code:** 200 OK
- **Body:**
```json
{
    "ISBN": "978-0321815736",
    "title": "Software Architecture in Practice",
    "Author": "Bass, L.",
    "description": "seminal book on software architecture",
    "genre": "non-fiction",
    "price": 59.95,
    "quantity": 99
}
```

*ISBN not found:*
- **Status Code:** 404 Not Found

---

## Customer Endpoints

### Add Customer

**Endpoint:** `POST /customers`

Registers a new customer in the system. A unique numeric ID is generated for the customer.

**Request Body:**
```json
{
    "userId": "starlord2002@gmail.com",
    "name": "Star Lord",
    "phone": "+14122144122",
    "address": "48 Galaxy Rd",
    "address2": "suite 4",
    "city": "Fargo",
    "state": "ND",
    "zipcode": "58102"
}
```

**Validation:**
- `userId` must be a valid email address
- `state` must be a valid 2-letter US state abbreviation
- All fields are mandatory except `address2`

**Responses:**

*Successful creation:*
- **Status Code:** 201 Created
- **Headers:** Location: `/customers/{ID of the new customer}`
- **Body:**
```json
{
    "id": 123456,
    "userId": "starlord2002@gmail.com",
    "name": "Star Lord",
    "phone": "+14122144122",
    "address": "48 Galaxy Rd",
    "address2": "suite 4",
    "city": "Fargo",
    "state": "ND",
    "zipcode": "58102"
}
```

*User ID already exists:*
- **Status Code:** 422 Unprocessable Entity
- **Body:**
```json
{
    "message": "This user ID already exists in the system."
}
```

*Invalid input:*
- **Status Code:** 400 Bad Request

---

### Retrieve Customer by ID

**Endpoint:** `GET /customers/{id}`

Retrieves customer data by numeric ID.

**URL Parameters:**
- `id` (required): Numeric ID of the customer

**Responses:**

*Success:*
- **Status Code:** 200 OK
- **Body:**
```json
{
    "id": 123456,
    "userId": "starlord2002@gmail.com",
    "name": "Star Lord",
    "phone": "+14122144122",
    "address": "48 Galaxy Rd",
    "address2": "suite 4",
    "city": "Fargo",
    "state": "ND",
    "zipcode": "58102"
}
```

*ID not found:*
- **Status Code:** 404 Not Found

*Invalid input:*
- **Status Code:** 400 Bad Request

---

### Retrieve Customer by User ID

**Endpoint:** `GET /customers?userId={userId}`

Retrieves customer data by user ID (email address).

**Query Parameters:**
- `userId` (required): Email address of the customer (URL-encoded)
  - Example: `userId=starlord2002%40gmail.com` (for starlord2002@gmail.com)

**Responses:**

*Success:*
- **Status Code:** 200 OK
- **Body:**
```json
{
    "id": 123456,
    "userId": "starlord2002@gmail.com",
    "name": "Star Lord",
    "phone": "+14122144122",
    "address": "48 Galaxy Rd",
    "address2": "suite 4",
    "city": "Fargo",
    "state": "ND",
    "zipcode": "58102"
}
```

*User ID not found:*
- **Status Code:** 404 Not Found

*Invalid input:*
- **Status Code:** 400 Bad Request