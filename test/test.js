const assert = require("assert");
const message = {
    channel: {
        send(message) {
            console.log(message);
        },
    },
};

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
        user: "Aqui você digita a opção [pedra | papel | tesoura]`.",
        opponent: `Um usuário te desafiou para uma partida de jokenpo!
      Para aceitar é necessário apenas digitar a opção [pedra | papel | tesoura]`,
        timeout: "O tempo limite é de 60s.",
    },
};

const _Jokenpo = require("../lib/index");

function hasValues(result) {
    if (result.hasOwnProperty("player") && result.hasOwnProperty("opponent")) {
        if (
            Object.values(result).includes(true) ||
            Object.values(result).includes(false)
        ) {
            return true;
        }
    } else {
        return false;
    }
}

function ifPedra() {
    const Jokenpo = new _Jokenpo(message, "pedra");
    Jokenpo.setMessages(messages);
    Jokenpo.setLang("pt-br");
    Jokenpo.play();
    return hasValues(Jokenpo.result());
}

function ifPapel() {
    const Jokenpo = new _Jokenpo(message, "papel");
    Jokenpo.setMessages(messages);
    Jokenpo.setLang("pt-br");
    Jokenpo.play();
    return hasValues(Jokenpo.result());
}

function ifTesoura() {
    const Jokenpo = new _Jokenpo(message, "tesoura");
    Jokenpo.setMessages(messages);
    Jokenpo.setLang("pt-br");
    Jokenpo.play();
    return hasValues(Jokenpo.result());
}

function ifRock() {
    const Jokenpo = new _Jokenpo(message, "rock");
    Jokenpo.setMessages(messages);
    Jokenpo.setLang("en");
    Jokenpo.play();
    return hasValues(Jokenpo.result());
}

function ifPaper() {
    const Jokenpo = new _Jokenpo(message, "paper");
    Jokenpo.setMessages(messages);
    Jokenpo.setLang("en");
    Jokenpo.play();
    return hasValues(Jokenpo.result());
}

function ifScissors() {
    const Jokenpo = new _Jokenpo(message, "scissors");
    Jokenpo.setMessages(messages);
    Jokenpo.setLang("en");
    Jokenpo.play();
    return hasValues(Jokenpo.result());
}

assert.strictEqual(ifPedra(), true);
assert.strictEqual(ifPapel(), true);
assert.strictEqual(ifTesoura(), true);

assert.strictEqual(ifRock(), true);
assert.strictEqual(ifPaper(), true);
assert.strictEqual(ifScissors(), true);
