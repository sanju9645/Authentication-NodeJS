
# 🚀 Authentication-NodeJS 🚀
### 🕵️‍♂️ Featuring: JWT & Google Oauth2.0 with Passport JS 🕵️‍♀️

🎉 **Welcome to the Adventure of Setting Up Your Project!** 🎉

## Let's Get This Party Started!

- 🚀 Fire up your terminal and launch:
```bash
  npm init -y
```

## 📦 Gathering the Magic Spells:

Time to load up on potions by running the following command in your terminal. Imagine this as stuffing your backpack with all the magical ingredients you'll need for your journey.


```bash
  npm install body-parser connect-mongo dotenv express express-ejs-layouts express-session mongoose passport passport-jwt cors cookie-parser bcrypt google-auth-library ejs passport- google-oauth20 jsonwebtoken path inspirational-quotes crypto fs nodemailer uuid express-session
```


## 🧙‍♂️ Sidekick Alert: Nodemon!
🧙‍♂️ Summon your trusty companion with:

```bash
npm install nodemon --save-dev
```

## 📜 The Secret Scroll (.env):
📜 Craft a .env parchment filled with your arcane secrets (configs).

## 🔐 Local Authentication Key Pair Generation

For the secure operation of our local authentication mechanism, it's essential to generate a unique key pair. This key pair will be the cornerstone of ensuring secure data transactions between your application and the server.

To conjure up this magical key pair, embark on the following incantation in your terminal:

```bash
node tools/generateKeypair
```


## 🧙‍♀️ Invisibility Cloak (.gitignore):
🧙‍♀️ Make your "node_modules/" and ".env" vanish from prying eyes!

  ```bash
node_modules/
.env
```


## 🏰 Setting Up Camp with Grepper
🏰 Create your fortress, **Authentication-NodeJS**, in the realm of MongoDB Atlas.

To establish your stronghold:
1. Navigate to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in or create an account.
2. Create a new project and name it `Authentication-NodeJS`.
3. Within your project, build a new cluster where your data will reside.
4. Secure your cluster with a database user and whitelist your application's IP address.
5. Conjure the connection string by choosing "Connect your application" and select the driver version relevant to your sorcery.
6. Engrave this connection incantation into your `.env` scroll as `MONGODB_URI`, replacing `{username}`, `{password}`, and `{database}` with your specific credentials.

This fortress will not only protect your data but also empower your application with the ancient wisdom of NoSQL databases.


## 🔗 Magical Link

🔗 Enchant a connection string in your .env scroll to link your fortress with the Atlas realm.

```plaintext
MONGODB_URI=mongodb+srv://{username}:{password}@cluster0.lo3cgvx.mongodb.net/{database}
```

## 🚪 Port to the Future

🚪 Decide on a magical PORT number for your gateways.

```plaintext
PORT=3000
```


## 📧 Council of Admins

📧 Gather the email scrolls of your admin wizards.

```plaintext
ADMIN_EMAILS=s@gmail.com,sa@gmail.com,san@gmail.com
```


## 🕊️ Pigeon Post Setup

🕊️ Configure your owl (nodemailer) with your Gmail credentials for sending messages.

```plaintext
AUTH_EMAIL={yourgmailid}@gmail.com
AUTH_PASS={yourpassword}
```



## 🏠 Homestead

🏠 Establish your HOME_URL as the base of your operations.

```plaintext
HOME_URL=http://localhost:3000/
```

## 📚 Google's Secret Library

Visit the mystical [Google Developer Console](https://console.developers.google.com/) and create OAuth 2.0 credentials. Remember, your secret base is `http://localhost:3000/auth/google/callback`.



## 🔑 Enchanted Keys

Safeguard your client id and secret in the `.env` scroll.

```plaintext
GOOGLE_AUTH_CLIENT_ID={client_id}.apps.googleusercontent.com
GOOGLE_AUTH_CLIENT_SECRET={secret}
```

## 🗝️ Mystical Session Secret

Concoct a powerful `EXPRESS_SESSION_SECRET` potion.

```plaintext
EXPRESS_SESSION_SECRET={give a strong secret here}
```


## Customize Your Castle:

🏰 Want to change the look of your login chamber? Drop a majestic image in '/img/login/' and rename it to 'index.jpeg'.
Declare the colors of your domain with Tailwind CSS spells in your .env scroll. Feel free to mix and match!

```plaintext
PORTAL_SITE_NAME=BurnBitBistro

# use tailwind css colors
PORTAL_PAGE_MAIN_COLOR=green
PORTAL_BOX_MAIN_HEADING_COLOR=green
PORTAL_BOX_SUB_HEADING_COLOR=green
PORTAL_FORM_LABEL_COLOR=green
PORTAL_FORM_BUTTON_COLOR=green
PORTAL_QUOTE_TEXT_COLOR=white
PORTAL_SITE_NAME_TEXT_COLOR=white
```




<br><br><br><br><br><br><br><br><br><br><br><br>

```plaintext
PORT=3000

MONGODB_URI=mongodb+srv://{username}:{password}@cluster0.lo3cgvx.mongodb.net/{database}

ADMIN_EMAILS=s@gmail.com,sa@gmail.com,sanju@gmail.com

# Auth email credentials
AUTH_EMAIL=burnbitbistro@gmail.com
AUTH_PASS=weqxxafyedpvcato

HOME_URL=http://localhost:3000/


GOOGLE_AUTH_CLIENT_ID = {client_id}.apps.googleusercontent.com
GOOGLE_AUTH_CLIENT_SECRET = {secret}

EXPRESS_SESSION_SECRET = {SECRET}

JWT_SECRET = {SECRET}

# To change the background image of login/index page paste the image in '/img/login/' and rename to 'index.jpeg'
# /img/login/index.jpeg

PORTAL_SITE_NAME=BurnBitBistro

# use tailwind css colors
PORTAL_PAGE_MAIN_COLOR=green
PORTAL_BOX_MAIN_HEADING_COLOR=green
PORTAL_BOX_SUB_HEADING_COLOR=green
PORTAL_FORM_LABEL_COLOR=green
PORTAL_FORM_BUTTON_COLOR=green
PORTAL_QUOTE_TEXT_COLOR=white
PORTAL_SITE_NAME_TEXT_COLOR=white

# gray
# PORTAL_BOX_SUB_HEADING_COLOR=gray
# PORTAL_FORM_LABEL_COLOR=gray
```







<br><br><br><br><br><br><br><br><br><br><br><br>


Project - Development Kickstart

1. Kickstart Your Project:
   Run the command: npm init -y

2. Install Magic Ingredients:
   Execute: 
   npm i body-parser connect-mongo dotenv express express-ejs-layouts express-session mongoose passport passport-jwt cors cookie-parser bcrypt google-auth-library ejs passport-google-oauth20 jsonwebtoken path inspirational-quotes crypto fs nodemailer uuid express-session

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

