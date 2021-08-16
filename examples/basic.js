const message = {
    channel: {
        send(message) {
            console.log(message);
        }
    }
}

const _Jokenpo = require("../lib/index.js");
const Jokenpo = new _Jokenpo("Comando falhou.", "pt-br", "Empate.", "Bot ganhou.", "Usuário Ganhou.", message, "pedra");
Jokenpo.play();
Jokenpo.send();
