# Backend: Pintereach

## Schema

### Endpoint: https://bw-pintereach-aja.herokuapp.com/

### POST Users: Registration

```
{
  firstName: "", // string, required
  lastName: "", // string, required
  username: "", // string, required, must be unique
  password: "", // string, required
}
```

### POST Users: Login

```
{
  username: "",
  password: ""
}
```

### POST Article: Saving new article

```
{
  url: "", // string, required
  title: "", // string, required
  desc: "", // string NOT required
  categoryID: NUMBER // integer, required
}
```

### POST Category: Adding new category

```
{
  name: "", // string, required
  desc: "", // string, NOT required
}
```

### PUT Article: Editing an article

```
{
  url: "", // string, required
  title: "", // string, required
  desc: "", // string, NOT required
}
```

### PUT Category: Editing a category

```
{
  name: "", // string, required
  desc: "", // string, NOT required
}
```

## Endpoints: Articles

| Method    | Endpoint                                    | Description                           |
| --------- | ------------------------------------------- | ------------------------------------- |
| GET       | /api/articles/                              | Returns every article in collection   |
| GET       | /api/articles/:id                           | Returns a specific article of that ID |
| GET       | /api/articles/:userID/user                  | Returns all articles from a user      |
| GET       | /api/articles/:categoryID/category          | Returns all articles in a category    |
| POST      | /api/articles/:userID/user                  | Save a new article                    |
| POST      | /api/articles/new-category                  | Add a new category                    |
| PUT       | /api/articles/:articleID                    | Edit an article                       |
| PUT       | /api/articles/:categoryID/edit-category     | Edit a category                       |
| DELETE    | /api/articles/:articleID/remove-article     | Delete an article                     |
| DELETE    | /api/articles/:categoryID/remove-category   | Delete a category                     |
| Auth ---- | ------------------------------------------- | ------------------------------        |
| GET       | /api/auth/users                             | Get all users                         |
| GET       | /api/auth/logout                            | Logs out users                        |
| POST      | /api/auth/login                             | Logs in users                         |
| POST      | /api/auth/register                          | Creates a new user                    |
