# Authentication-NodeJS
Authentication - JWT and  Google oauth20 using Passport JS


1. Initialize a New Project:
  npm init -y

2. Install all dependencies

  npm i body-parser connect-mongo dotenv express express-ejs-layouts express-session mongoose passport passport-jwt cors cookie-parser bcrypt google-auth-library ejs passport-google-oauth20 jsonwebtoken path 

npm i bcrypt connect-mongo cookie-parser dotenv ejs express express-ejs-layouts express-session jsonwebtoken method-override mongoose

3. Install developer depencies
   npm i nodemon --save-dev

4. Create .env file

5. Create a .gitignore file
  add the following contents
  
  node_modules/
  .env

6. Update Package.json Scripts:
  Modify the "scripts" section in package.json to include start and dev commands.

"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "app.js",
  "dev": "nodemon app.js"
}

7. Create app.js File:

8. create new project 'Authentication-NodeJS' on mongoDB atlas

9. Add the connection string on .env file
MONGODB_URI=mongodb+srv://{username}:{password}@cluster0.lo3cgvx.mongodb.net/{database}

10. Setup server/config/database file

11. Create a new file called lib/errorHandler.js and create the errorHandler function

12. include it on the app.js

13. create the 'public' folder on the root directory to add the static files

14. add this middleware on app.js file
    app.use(express.static('public'));

15. create the 'views' folder on the root directory and create subfolders 'layout' and 'partials'

16. Create the 'skelton.ejs' file on the 'layouts' folder
    Add the basic html content on this skelton file

17. Create a 'login' page view on the 'views' folder

18. Create a main route file on 'server/routes/main'

19. Include this middleware on app.js
    app.use('/', require('./server/routes'));
