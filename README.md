# discord-jokenpo

Jokenpo para bots do Discord.

Suporta os idiomas Inglês (en) e Português Brasileiro (pt-br).

### Instalação
```js
npm install discord-jokenpo
```

### Exemplo de uso
```js
const _Jokenpo = require("discord-jokenpo");
let args = "pedra";
const Jokenpo = new _Jokenpo("Comando falhou.", "pt-br", "Empate.", "Bot ganhou.", "Usuário ganhou.", "Usuário ganhou.", message, args);
Jokenpo.play();
Jokenpo.send();
```