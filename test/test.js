const assert = require("assert");
const message = {
    channel: {
        send(message) {
            console.log(message);
        }
    }
}

const _Jokenpo = require("../lib/index");

function hasValues(result) {
    if (result.hasOwnProperty("player") && result.hasOwnProperty("bot")) {
        if (Object.values(result).includes(true) || Object.values(result).includes(false)) {
            return true;
        }
    }
    else {
        return false;
    }
}

function ifPedra() {
    const Jokenpo = new _Jokenpo("Comando falhou.", "pt-br", "Empate.", "Bot ganhou.", "Usuário Ganhou.", message, "pedra");

    Jokenpo.play()

    const result = Jokenpo.result();
    return hasValues(result);
}

function ifPapel() {
    const Jokenpo = new _Jokenpo("Comando falhou.", "pt-br", "Empate.", "Bot ganhou.", "Usuário Ganhou.", message, "papel");

    Jokenpo.play()

    const result = Jokenpo.result();
    return hasValues(result);
}

function ifTesoura() {
    const Jokenpo = new _Jokenpo("Comando falhou.", "pt-br", "Empate.", "Bot ganhou.", "Usuário Ganhou.", message, "tesoura");

    Jokenpo.play()

    const result = Jokenpo.result();
    return hasValues(result);
}


function ifRock() {
    const Jokenpo = new _Jokenpo("Comando falhou.", "en", "Empate.", "Bot ganhou.", "Usuário Ganhou.", message, "rock");

    Jokenpo.play()

    const result = Jokenpo.result();
    return hasValues(result);
}

function ifPaper() {
    const Jokenpo = new _Jokenpo("Comando falhou.", "en", "Empate.", "Bot ganhou.", "Usuário Ganhou.", message, "paper");

    Jokenpo.play()

    const result = Jokenpo.result();
    return hasValues(result);
}

function ifScissors() {
    const Jokenpo = new _Jokenpo("Comando falhou.", "en", "Empate.", "Bot ganhou.", "Usuário Ganhou.", message, "scissors");

    Jokenpo.play()

    const result = Jokenpo.result();
    return hasValues(result);
}

assert.strictEqual(ifPedra(), true);
assert.strictEqual(ifPapel(), true);
assert.strictEqual(ifTesoura(), true);

assert.strictEqual(ifRock(), true);
assert.strictEqual(ifPaper(), true);
assert.strictEqual(ifScissors(), true);
