# Node auth

Learning how to secure node REST API with Alura's course.

To run this project You'll need Node.js and npm installed in your machine.
After downloading it run `npm i` to install the dependencies and then `npm start` to serve the API at `localhost:3000`.

You'll also need to configure the environment variables in a file named `.env` that needs to be created at the root directory of the application:

```
CHAVE_JWT=<set a random secret key to generate JWT keys>
BASE_URL="localhost:3000"

EMAIL_HOST="smtp.gmail.com"
EMAIL_USUARIO="<yourmail>@gmail.com"
EMAIL_SENHA="<your e-mail password>"

NODE_ENV="development"
```

Note that the e-mail will be sent only if `NODE_ENV` is set to `"production"`. You can check the logic at `/src/usuarios/emails.js`