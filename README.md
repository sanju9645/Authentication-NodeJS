# Authentication-NodeJS
Authentication - JWT and  Google oauth20 using Passport JS


1. Kickstart Your Project:
   Run the command: npm init -y

2. Install Magic Ingredients:
   Execute: npm i body-parser connect-mongo dotenv express express-ejs-layouts express-session mongoose passport passport-jwt cors cookie-parser bcrypt google-auth-library ejs passport-google-oauth20 jsonwebtoken path inspirational-quotes crypto fs nodemailer uuid

3. Equip Your Developers:
   Install Nodemon as a sidekick: npm i nodemon --save-dev

4. Unveil the Secret (.env):
   Craft a .env file with your special configurations.

5. Conceal Your Secrets (.gitignore):
   Shield sensitive stuff: node_modules/ and .env stay hidden.
  
  node_modules/
  .env

6. Script Enchantments:
   📜 Add the magic spells in the "scripts" section of your package.json.

   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "app.js",
      "dev": "nodemon app.js"
   }

7. Forge Your app.js Saga:

8. create new project 'Authentication-NodeJS' on mongoDB atlas

9. Add the connection string on .env file
MONGODB_URI=mongodb+srv://{username}:{password}@cluster0.lo3cgvx.mongodb.net/{database}

10. Database Configuration (server/config/database):
    🛡️ Configure your database settings.

11. Error Handling (lib/errorHandler.js):
    👻 Implement a robust error-handling mechanism.

12. Incorporate Error Handling:
    🛡️ Integrate error handling into your app.js.

13. Static Files Vault (public Folder):
    🏦 Create a repository for static files.

14. add this middleware on app.js file
    app.use(express.static('public'));

15. Views Organization:
    create the 'views' folder on the root directory and create subfolders 'layout' and 'partials'
    👑 Organize your views in the 'views' directory.

16. Layout Structure (layouts):
    Create the 'skelton.ejs' file on the 'layouts' folder
    🏰 Design a layout for your pages ('skelton.ejs').

17. Welcome to the Login Page (login View):
    📜 Craft a welcoming 'login' page.

18. Define Main Routes (server/routes/main):
    🗺️ Set up the main routes for navigation.

19. Middleware Application:
    🛡️ Implement middleware in your app.js.

    app.use('/', require('./server/routes'));

20. Controller Functions (server/controllers):
    🎮 Define controller functions for various tasks.





-------------------------------------------------
Passport-JWT Implementation
-------------------------------------------------

1. Create User schema in server/models/User.js

2. Load the models on app.js
    require('./server/models/User');

    Now the schema will be created on MongoDB

3. Create new script generateKeypair.js on 'tools' folder

4. create a 'keys' folder on the 'tools' folder

5. Run it by 
    node tools/generateKeypair

6. Add both keys on .gitignore,
    tools/keys/id_rsa_priv.pem
    tools/keys/id_rsa_pub.pem

    Because we don't need to push the keys to git and they keys will be generatd on the server by running the above mentioned script
    but we need to push the 'keys' folder
    Add a file named ".gitkeep" to the empty folder. Git does not track empty directories, but by adding a .gitkeep file, Git will see the folder as non-empty and include it in the next commit or push


7. create the passport configuration file on 'config' folder

8. require the passport module on app.js

9. require it on the app.js file
    require('./server/config/passport')(passport);

10. Call the middleware on the app.js
    app.use(passport.initialize());




-------------------------------------------------
Production
-------------------------------------------------

npm i

create the .env file

run 
node tools/generateKeypair

Add the email id and password on the .env file like below,

# Auth email credentials
AUTH_EMAIL=something@gmail.com
AUTH_PASS=yourpassword

Goto this link,
https://myaccount.google.com/security

Make sure that the 2 step verification is on 

Then goto this link,
https://myaccount.google.com/u/1/signinoptions/two-step-verification

Create APP password

Create a new APP with a name, copy the password


