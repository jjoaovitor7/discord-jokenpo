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
const Jokenpo = new _Jokenpo("Comando falhou.", "pt-br", "Empate.", "Bot ganhou.", "Usuário Ganhou.", message, "pedra");
Jokenpo.play();
Jokenpo.send();
```