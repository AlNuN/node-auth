const AcessControl = require('accesscontrol');
const controle = new AcessControl();

controle.grant('assinante')
  .readAny('post', ['id', 'titulo', 'conteudo', 'autor']);

controle.grant('editor')
  .extend('assinante')
  .createOwn('post')
  .deleteOwn('post');

controle.grant('admin')
  .extend('assinante')
  .createAny('post')
  .deleteAny('post')
  .readAny('usuario')
  .deleteAny('usuario');

module.exports = controle;
