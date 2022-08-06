const assert = require("assert");
const message = {
    mentions: {
        users: {
            first() { },
        }
    },
    channel: {
        send(m) { },
    },
};

const messages = {
    fail: `Tente jj jokenpo \`[pedra|papel|tesoura]\`.
ex.: \`jj jokenpo pedra\``,
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

const J = require("../lib/index.js");

function hasValues(result) {
    if ((result.hasOwnProperty("player") && result.hasOwnProperty("bot"))
        || (result.hasOwnProperty("player1") && result.hasOwnProperty("player2"))) {
        if (Object.values(result).includes(true) || Object.values(result).includes(false)) {
            return true;
        }
    } else {
        return false;
    }
}

function ptBR(args) {
    const Jokenpo = new J(message);
    Jokenpo.setConfig(messages, "pt-br");
    Jokenpo.play(args);
    const r = Jokenpo.result();
    return hasValues(r);
}

function en(args) {
    const Jokenpo = new J(message);
    Jokenpo.setConfig(messages, "en");
    Jokenpo.play(args);
    const r = Jokenpo.result();
    return hasValues(r);
}

try {
    assert.strictEqual(ptBR("pedra"), true);
    assert.strictEqual(ptBR("papel"), true);
    assert.strictEqual(ptBR("tesoura"), true);

    assert.strictEqual(en("rock"), true);
    assert.strictEqual(en("paper"), true);
    assert.strictEqual(en("scissors"), true);
    console.log("\x1b[32mOs testes passaram.\x1b[0m");
} catch (err) {
    console.log(err);
    console.log("\x1b[31mOs testes não passaram.\x1b[0m");
}