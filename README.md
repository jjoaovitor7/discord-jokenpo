# discord-jokenpo

[![discord-jokenpo](https://nodei.co/npm/discord-jokenpo.png)](https://nodei.co/npm/discord-jokenpo/)

Jokenpo para bots do Discord.

## Instalação (npm)
```js
npm i discord-jokenpo
```

## Exemplo de uso
```js
const _Jokenpo = require("discord-jokenpo");

const messages = {
    fail: "Tente jj jokenpo `[pedra|papel|tesoura]`.\nex.: `jj jokenpo pedra`",
    gameResults: {
        draw: "Empate!",
        botWinner: "O bot ganhou.",
        opponentWinner: "O oponente ganhou.",
        userWinner: "O usuário ganhou.",
    },
    gameStatus: {
        inProgress: "Partida iniciada ou há uma partida em andamento.",
        cancel: "Partida cancelada.",
    },
    messageTo: {
        user: "Aqui você digita a opção `[pedra | papel | tesoura]`.",
        opponent: "Um usuário te desafiou para uma partida de jokenpo!\nPara aceitar é necessário apenas digitar a opção `[pedra | papel | tesoura]`",
        timeout: "O tempo limite é de 60s.",
    },
};

let args = "pedra";

const Jokenpo = new _Jokenpo(message);
Jokenpo.setMessages(messages);
// Jokenpo.setLang("en");
Jokenpo.setLang("pt-br");

Jokenpo.play(args).then(() => {
    Jokenpo.send();
}).catch(console.error);
```
