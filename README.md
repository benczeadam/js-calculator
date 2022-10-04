# JavaScript Calculator
Full Stack simple calculator with React frontend and NodeJS backend.

## Author
- [Adam Bencze](https://github.com/benczeadam)

## Features
 - Basic operations and decimal point supported
 - Some input validation logics
 - Save result to a file through API call, then later load it back to the calculator
 - Aesthetic frontend
 
## Used technologies

- [React](https://reactjs.org/) - Frontend
- [React Bootstrap](https://react-bootstrap.github.io/) - Frontend
- [NodeJS](https://nodejs.org/en/) - Backend
- [Express](https://expressjs.com/) - Backend

## Installation

### Frontend

 - Install dependecies (from root directory)

```
cd frontend
npm i
```

### Backend

 - Install dependecies (from root directory)

```
npm i
```

### Starting webapp

 - Open two separate terminal in root folder

#### Terminal 1
```
npm run start-backend
```
#### Terminal 2
```
npm run start-frontend
```

## Documentation

### Backend

 - Simple node.js backend with express
 - API endpoints
   - /read
     - No params
     - Returns the content of the _number.json_ file
   - /write
     - One body param (_number_)
     - Rewrite the _number.json_ file

### Frontend

 - React frontend with React-Bootstrap
 - Basic documentation in the comments of the source file (_App.js_)


## Scalability possibilites

 - Calculator memory
   - In this state the calculator memory file (_number.json_) can only handle one stored number, therefore every user will overwrite each other saved number
   - The simplest solution is storing the Calculator result locally, in the browsers' memory
   - If the specification requires that the Calculator result must be held in the server, we can use indexed storing for each user in a database
 - Redux
   - For features introduced later, I would use Redux app level state managment system
   - Redux helps a lot in the communication between React components
 - Organize files consciously
   - The large amount of users would recommend a development team and the first step for teamwork is the transparency
   - Create separate directories for Components, Css files, Redux files, etc.
   - Separate codes that have different context (Business logic, View)
 - More responsiveness
   - A webapp must support as many device type as it can
   - Therefore it is really important to create responsive webapps
   - Creating good CSS code would help making a webapp responsive, but for a short cut we can use libraries like Bootstrap
  
