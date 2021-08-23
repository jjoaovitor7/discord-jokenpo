class Jokenpo {

    /**
     * @class Jokenpo
     * @constructor
     * @param {string} failCommandText - Fail Command Text Message
     * @param {string} lang - Language
     * @param {string} drawText - Draw Text Message
     * @param {string} opponentWinnerText - Opponent Winner Text Message
     * @param {string} userWinnerText - User Winner Text Message
     * @param {Object} message - Discord "message" Object
     * @param {string} args - Option
     * @param {string} gameInProgress - Game In Progress Text Message
     * @param {string} botWinnerText - Bot Winner Text Message
     */

    constructor(failCommandText, lang,
        drawText, botWinnerText, opponentWinnerText, userWinnerText, gameInProgress,
        message, args) {
        this.failCommandText = failCommandText;
        this.lang = lang;
        this.drawText = drawText;
        this.botWinnerText = botWinnerText;
        this.opponentWinnerText = opponentWinnerText;
        this.userWinnerText = userWinnerText;
        this.gameInProgress = gameInProgress;
        this.message = message;
        this.args = args;
        this.options = null;
        this.optionBot = null;
        this.players = null;
        this.playersOptions = { "player1Option": null, "player2Option": null }
        this.game = new Object();
        this.gameFile = null;
    }

    /**
     * @method Jokenpo.play
     * @returns {undefined|Promise}
     */
    async play() {
        let user = this.message.mentions.users.first();
        if (this.args === "" && user == undefined) {
            this.message.channel.send(this.failCommandText);
        }
        else {
            if (this.lang === "en") {
                this.options = ["rock", "paper", "scissors"];
            }
            else {
                this.options = ["pedra", "papel", "tesoura"];
            }

            if (this.args !== "") {
                if (user === undefined) {
                    this.players = 1;
                    if (this.players === 1) {
                        if (this.args === this.options[0]) {
                            this.optionBot = this.options[Math.floor(Math.random() * 3)];
                            this.result();
                        }
                        else if (this.args === this.options[1]) {
                            this.optionBot = this.options[Math.floor(Math.random() * 3)];
                            this.result();
                        }
                        else if (this.args === this.options[2]) {
                            this.optionBot = this.options[Math.floor(Math.random() * 3)];
                            this.result();
                        }
                        else {
                            this.message.channel.send(
                                this.failCommandText
                            );
                        }
                    }
                }
                else if (user !== undefined) {

                    let fs = require('fs');
                    let exists = await fs.promises.stat("./game.json");
                    if (exists.isFile("game.json")) {
                        this.gameFile = JSON.parse(fs.readFileSync("./game.json", "utf8"));
                    }

                    if (this.gameFile[this.message.guild.id] === undefined) {
                        if (this.message.guild !== null) {
                            this.game[this.message.guild.id] = true;
                            Object.assign(this.gameFile, this.game);
                            fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
                            this.message.channel.send(this.gameInProgress);
                        }

                        this.players = 2;
                        if (this.players === 2) {
                            if (!(this.message.author.id === user.id) && user.bot !== true) {
                                return this.message.author.send("Aqui você digita a opção [pedra | papel | tesoura]\`.").then(async (message) => {
                                    const filterPlayer1 = () => {
                                        return this.message.author.id === message.channel.recipient.id;
                                    }

                                    this.playersOptions.player1Option = await message.channel.awaitMessages(filterPlayer1, {
                                        max: 1,
                                        time: 60000,
                                        errors: ["time"]
                                    }).catch(() => {
                                        delete this.game[this.message.guild.id];
                                        const fs = require("fs");
                                        Object.assign(this.gameFile, this.game);
                                        fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
                                        this.message.author.send('O tempo limite é de 60s.');
                                        return 0;
                                    });
                                    try {
                                        this.playersOptions.player1Option = this.playersOptions.player1Option.first().content;
                                    }
                                    catch (TypeError) {

                                    }

                                    return this.message.guild.members.cache.get(user.id).send(`O usuário ${this.message.author.username}#${this.message.author.discriminator} te desafiou para uma partida de jokenpo!
Para aceitar é necessário apenas digitar a opção [pedra | papel | tesoura]`).then(async (message) => {
                                        const filterPlayer2 = () => {
                                            return user.id === message.channel.recipient.id;
                                        }

                                        this.playersOptions.player2Option = await message.channel.awaitMessages(filterPlayer2, {
                                            max: 1,
                                            time: 60000,
                                            errors: ["time"]
                                        }).catch(() => {
                                            delete this.game[this.message.guild.id];
                                            const fs = require("fs");
                                            Object.assign(this.gameFile, this.game);
                                            fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
                                            this.message.author.send('O tempo limite é de 60s.');
                                            return 0;
                                        });

                                        try {
                                            this.playersOptions.player2Option = this.playersOptions.player2Option.first().content;
                                        }
                                        catch (TypeError) {

                                        }

                                        return new Promise((resolve, reject) => {
                                            if (this.playersOptions.player1Option !== null && this.playersOptions.player2Option !== null) {
                                                resolve();
                                            }
                                            else {
                                                reject();
                                            }
                                        });
                                    })
                                }
                                )
                            }
                            else {
                                this.message.channel.send(this.failCommandText);
                            }
                        }
                    }
                    else {
                        this.message.channel.send(this.gameInProgress);
                    }
                }
            }
        }
    }

    /**
     * @method Jokenpo.getPlayersCount
     * @returns {number}
     */
    getPlayersCount() {
        return this.players;
    }

    /**
     * @method Jokenpo.playersOptions
     * @returns {Object}
     */
    getPlayersOptions() {
        return this.playersOptions;
    }
    /**
     * @method Jokenpo.result
     * @returns {Object}
     */
    result() {
        if (this.players === 1) {
            if (this.args === this.options[0]) {
                if (this.optionBot === this.options[1]) {
                    return { "player": false, "opponent": true }
                }
                else if (this.optionBot === this.options[2]) {
                    return { "player": true, "opponent": false }
                }
                else {
                    return { "player": false, "opponent": false }
                }
            }

            else if (this.args === this.options[1]) {
                if (this.optionBot === this.options[0]) {
                    return { "player": true, "opponent": false }
                }
                else if (this.optionBot == this.options[2]) {
                    return { "player": false, "opponent": true }
                }
                else {
                    return { "player": false, "opponent": false }
                }
            }

            else if (this.args === this.options[2]) {
                if (this.optionBot === this.options[0]) {
                    return { "player": false, "opponent": true }
                }
                else if (this.optionBot === this.options[1]) {
                    return { "player": true, "opponent": false }
                }
                else {
                    return { "player": false, "opponent": false }
                }
            }
        }
        else if (this.players === 2) {
            if (this.playersOptions.player1Option === this.options[0]) {
                if (this.playersOptions.player2Option === this.options[1]) {
                    return { "player": false, "opponent": true }
                }
                else if (this.playersOptions.player2Option === this.options[2]) {
                    return { "player": true, "opponent": false }
                }
                else {
                    return { "player": false, "opponent": false }
                }
            }

            else if (this.playersOptions.player1Option === this.options[1]) {
                if (this.playersOptions.player2Option === this.options[0]) {
                    return { "player": true, "opponent": false }
                }
                else if (this.playersOptions.player2Option == this.options[2]) {
                    return { "player": false, "opponent": true }
                }
                else {
                    return { "player": false, "opponent": false }
                }
            }

            else if (this.args === this.options[2]) {
                if (this.playersOptions.player2Option === this.options[0]) {
                    return { "player": false, "opponent": true }
                }
                else if (this.playersOptions.player2Option === this.options[1]) {
                    return { "player": true, "opponent": false }
                }
                else {
                    return { "player": false, "opponent": false }
                }
            }
        }
    }

    /**
     * @method Jokenpo.send
     * @returns {undefined}
     */
    send() {
        if (this.players === 1) {
            if (this.result().player === false && this.result().opponent === false) {
                this.message.channel.send(this.drawText);
            }
            else if (this.result().player === true) {
                this.message.channel.send(this.userWinnerText);
            }
            else if (this.result().opponent === true) {
                this.message.channel.send(this.botWinnerText);
            }
        }
        else if (this.players === 2) {
            try {
                if (this.result().player === false && this.result().opponent === false) {
                    this.message.channel.send(`\`1:\` ${this.playersOptions.player1Option}\n\`2:\` ${this.playersOptions.player2Option}\n${this.drawText}`);
                }
                else if (this.result().player === true) {
                    this.message.channel.send(`\`1:\` ${this.playersOptions.player1Option}\n\`2:\` ${this.playersOptions.player2Option}\n${this.userWinnerText}`);
                }
                else if (this.result().opponent === true) {
                    this.message.channel.send(`\`1:\` ${this.playersOptions.player1Option}\n\`2:\` ${this.playersOptions.player2Option}\n${this.opponentWinnerText}`);
                }
                delete this.game[this.message.guild.id];
            }
            catch (TypeError) {

            }

            const fs = require("fs");
            Object.assign(this.gameFile, this.game);
            fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
        }
    }
}

module.exports = Jokenpo;
