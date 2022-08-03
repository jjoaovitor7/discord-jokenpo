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

const _Jokenpo = require("../lib/index.js");

function hasValues(result) {
    if (result.hasOwnProperty("player") && result.hasOwnProperty("opponent")) {
        if (Object.values(result).includes(true) || Object.values(result).includes(false)) {
            return true;
        }
    } else {
        return false;
    }
}

function ptBR(args) {
    const Jokenpo = new _Jokenpo(message);
    Jokenpo.setMessages(messages);
    Jokenpo.setLang("pt-br");
    Jokenpo.play(args);
    const r = Jokenpo.result();
    return hasValues(r);
}

function en(args) {
    const Jokenpo = new _Jokenpo(message);
    Jokenpo.setMessages(messages);
    Jokenpo.setLang("en");
    Jokenpo.play(args);
    const r = Jokenpo.result();
    return hasValues(r);
}

assert.strictEqual(ptBR("pedra"), true);
assert.strictEqual(ptBR("papel"), true);
assert.strictEqual(ptBR("tesoura"), true);

assert.strictEqual(en("rock"), true);
assert.strictEqual(en("paper"), true);
assert.strictEqual(en("scissors"), true);
