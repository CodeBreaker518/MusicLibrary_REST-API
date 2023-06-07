# MusicLibrary_REST-API

REST API with Express to perform CRUD operations on a MongoDB database for a music library


## Usage
### 1. Install MongoDB Server Comunnity

- Locate on the folder where MongoDB executables(bin) is located.
(example ```C:\Program Files\MongoDB\Server\{version}\6.0\bin```)

-  Start MongoDB Server
```
mongod --dbpath {database Path}
```
- Example:
```
mongod --dbpath C:\data\db
```
### 4. Locate on the project folder

```cd .\MusicLibrary_REST-API\ ```

- Install Dependencies
```
npm install
```

### 6. Initialize API

- with node.js
```
node index.js
```
- with nodemon
```
nodemon index.js
```
### 7. Manage API

You could use Postman
