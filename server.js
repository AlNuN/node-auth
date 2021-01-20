require('dotenv').config()

const app = require('./app');
const port = 3000;
require('./database');
require('./redis/blocklist-acess-token');
require('./redis/allowlist-refresh-token');

const jwt = require('jsonwebtoken');
const { InvalidArgumentError, NaoEncontrado, NaoAutorizado } = require('./src/erros');

app.use((req, res, next) => {
  const accept = req.getHeader('Accept');

  if (accept.indexOf('application/json') === -1 || accept.indexOf('*/*') === -1) {
    res.status(406);
    res.end();
    return;
  }

  res.set({
    'Content-Type': 'application/json'
  });
  next();
})

const routes = require('./rotas');
routes(app);

app.use((erro, req, res, next) => {
  let status = 500;
  const corpo = {
    mensagem: erro.message,
  };

  if (erro instanceof InvalidArgumentError) status = 400;
  if (erro instanceof NaoEncontrado) status = 404;
  if (erro instanceof NaoAutorizado) status = 401;
  if (erro instanceof jwt.JsonWebTokenError) status = 401;
  if (erro instanceof jwt.TokenExpiredError) {
    status = 401;
    corpo.expiradoEm = erro.expiredAt;
  }

  res.status(status).json(corpo);
});

app.listen(port);
