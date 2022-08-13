# discord-jokenpo

[![discord-jokenpo](https://nodei.co/npm/discord-jokenpo.png)](https://nodei.co/npm/discord-jokenpo/)

Jokenpo para bots do Discord.

## Instalação (npm)

```js
npm i discord-jokenpo
```

## Exemplo de uso

```js
const J = require("discord-jokenpo");

const messages = {
  fail: "Tente jj jokenpo `[pedra|papel|tesoura]`.\nex.: `jj jokenpo pedra`",
  gameStatus: {
    inProgress: "Partida iniciada ou há uma partida em andamento.",
    cancel: "Partida cancelada.",
  },
  messageTo: {
    user: "Aqui você digita a opção `[pedra | papel | tesoura]`.",
    opponent:
      "Um usuário te desafiou para uma partida de jokenpo!\nPara aceitar é necessário apenas digitar a opção `[pedra | papel | tesoura]`",
    timeout: "O tempo limite é de 60s.",
  },
};

client.on("messageCreate", async (message) => {
  const Jokenpo = new J(message);
  Jokenpo.setConfig(messages, "pt-br");
  // Jokenpo.setConfig(messages, "en");

  Jokenpo.play("pedra")
    .then(() => {
      const r = Jokenpo.result();
        if (r.player === false && r.bot === false) {
            message.channel.send(`Empate!`);
        } else if (r.bot === true) {
            message.channel.send(`<@${client.user.id}> ganhou.`);
        } else if (r.player === true) {
            message.channel.send(`<@${message.author.id}> ganhou.`);
        }
    }).catch(console.error);
});
```
