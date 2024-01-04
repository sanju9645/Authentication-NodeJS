# Authentication-NodeJS
Authentication - JWT and  Google oauth20 using Passport JS


1. Kickstart Your Project:
   Run the command: npm init -y

2. Install Magic Ingredients:
   Execute: npm i body-parser connect-mongo dotenv express express-ejs-layouts express-session mongoose passport passport-jwt cors cookie-parser bcrypt google-auth-library ejs passport-google-oauth20 jsonwebtoken path inspirational-quotes

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