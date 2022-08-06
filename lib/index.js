const fs = require("fs");

module.exports = class Jokenpo {
    /**
     * @class Jokenpo
     * @constructor
     * @param {Object} message - Discord "message" Object
     */

    #lang;
    constructor(message) {
        this.messages = {
            failCommandText: "Fail Command Text",
            drawText: "Draw Text",
            botWinnerText: "Bot Winner Text",
            opponentWinnerText: "Opponent Winner Text",
            userWinnerText: "User Winner Text",
            gameInProgressText: "Game in Progress Text",
            gameCancelText: "Game Cancel Text",
            messageToUserText: "Message to User Text",
            messageToOponnentText: "Message to Opponent Text",
            timeoutText: "Timeout Text"
        }
        this.#lang = "en";
        this.message = message;
        this.playersChoices = { "playerone_choice": null, "playertwo_choice": null }
        this.game = null;
    }

    /**
     * @method Jokenpo.setConfig
     * @param {Object} messages - Fail, Game Results, Game Status, Message To Text Messages
     * @param {string} lang - Language
     * @returns {undefined}
     */
    setConfig(messages, lang) {
        this.#lang = lang;
        this.messages = {
            failCommandText: messages.fail,
            drawText: messages.gameResults.draw,
            botWinnerText: messages.gameResults.botWinner,
            opponentWinnerText: messages.gameResults.opponentWinner,
            userWinnerText: messages.gameResults.userWinner,
            gameInProgressText: messages.gameStatus.inProgress,
            gameCancelText: messages.gameStatus.cancel,
            messageToUserText: messages.messageTo.user,
            messageToOponnentText: messages.messageTo.opponent,
            timeoutText: messages.messageTo.timeout
        }
    }

    /**
     * @method Jokenpo.updateGame
     * @returns {undefined}
     */
    #updateGame() {
        delete this.game[this.message.guild.id];
        fs.writeFileSync("./game.json", JSON.stringify(this.game, 4, "\t"));
    }

    /**
     * @method Jokenpo.play
     * @param {string} args - Choice
     * @returns {undefined|Promise}
     */
    async play(args) {
        this.args = args;
        this.#lang == "en" ? this.choices = ["rock", "paper", "scissors"] : this.choices = ["pedra", "papel", "tesoura"];

        if ((this.message.mentions.users.first() === undefined || this.message.mentions.users.first() === null) && this.choices.includes(this.args)) {
            switch (this.args) {
                case this.choices[0]:
                    this.botChoice = this.choices[Math.floor(Math.random() * 3)];
                    break;
                case this.choices[1]:
                    this.botChoice = this.choices[Math.floor(Math.random() * 3)];
                    break;
                case this.choices[2]:
                    this.botChoice = this.choices[Math.floor(Math.random() * 3)];
                    break;
                default:
                    this.message.channel.send(this.messages.failCommandText);
                    break;
            }

            return new Promise((resolve, reject) => {
                if (this.botChoice === null || this.botChoice === undefined) {
                    reject();
                } else {
                    resolve();
                }
            });
        } else if (this.message.mentions.users.first() !== undefined && !(this.message.mentions.users.first().bot)) {
            this.user = this.message.mentions.users.first();
            this.botChoice = null;
            await fs.promises.stat("./game.json").catch(() => {
                fs.writeFileSync("./game.json", JSON.stringify({}), { flag: 'wx' });
            });

            this.game = JSON.parse(fs.readFileSync("./game.json", "utf8"));

            if (this.message.guild !== undefined && this.message.guild !== null
                && this.game[this.message.guild.id] === undefined) {
                if (this.game[this.message.guild.id] === this.message.author.id) {
                    this.message.channel.send(this.messages.gameInProgressText);
                } else {
                    let aux = Object();
                    aux[this.message.guild.id] = this.message.author.id;
                    Object.assign(this.game, aux);
                    fs.writeFileSync("./game.json", JSON.stringify(this.game, 4, "\t"));
                }

                if (this.botChoice === null) {
                    const timeout = () => {
                        this.#updateGame();
                        this.message.author.send(this.messages.timeoutText);
                        this.message.channel.send(this.messages.gameCancelText);
                    }

                    if (!(this.message.author.id === this.user.id) && !(this.user.bot)) {
                        const message = await this.message.author.send(this.messages.messageToUserText);
                        const msg_1 = await message.channel.awaitMessages({
                            filter: () => this.message.author.id === message.channel.recipient.id,
                            max: 1, time: 60_000, errors: ['time']
                        }).catch(() => {
                            timeout();
                        });

                        const message_2 = await this.message.guild.members.cache.get(this.user.id)
                            .send(this.messages.messageToOponnentText);
                        const msg_2 = await message_2.channel.awaitMessages({
                            filter: () => this.user.id === message_2.channel.recipient.id,
                            max: 1, time: 60_000, errors: ['time']
                        }).catch(() => {
                            timeout();
                        });

                        this.playersChoices.playerone_choice = msg_1.first().content;
                        this.playersChoices.playertwo_choice = msg_2.first().content;

                        return new Promise((resolve, reject) => {
                            if (this.playersChoices.playerone_choice === null || this.playersChoices.playertwo_choice === null) {
                                reject();
                            } else {
                                resolve();
                            }
                        });
                    }
                }
            } else {
                this.message.channel.send(this.messages.gameInProgressText);
            }
        } else {
            this.message.channel.send(this.messages.failCommandText);
        }
    }

    /**
     * @method Jokenpo.result
     * @returns {Object}
     */
    result() {
        if (this.choices.includes(this.botChoice)) {
            if (this.args === this.choices[0]) {
                switch (this.botChoice) {
                    case this.choices[1]:
                        return { "player": false, "opponent": true }
                    case this.choices[2]:
                        return { "player": true, "opponent": false }
                    default:
                        return { "player": false, "opponent": false }
                }
            }

            else if (this.args === this.choices[1]) {
                switch (this.botChoice) {
                    case this.choices[0]:
                        return { "player": true, "opponent": false }
                    case this.choices[2]:
                        return { "player": false, "opponent": true }
                    default:
                        return { "player": false, "opponent": false }
                }
            }

            else if (this.args === this.choices[2]) {
                switch (this.botChoice) {
                    case this.choices[0]:
                        return { "player": false, "opponent": true }
                    case this.choices[1]:
                        return { "player": true, "opponent": false }
                    default:
                        return { "player": false, "opponent": false }
                }
            }
        }
        else {
            if (this.playersChoices.playerone_choice === this.choices[0]) {
                switch (this.playersChoices.playertwo_choice) {
                    case this.choices[1]:
                        return { "player": false, "opponent": true }
                    case this.choices[2]:
                        return { "player": true, "opponent": false }
                    default:
                        return { "player": false, "opponent": false }
                }
            }

            else if (this.playersChoices.playerone_choice === this.choices[1]) {
                switch (this.playersChoices.playertwo_choice) {
                    case this.choices[0]:
                        return { "player": true, "opponent": false }
                    case this.choices[2]:
                        return { "player": false, "opponent": true }
                    default:
                        return { "player": false, "opponent": false }
                }
            }

            else if (this.playersChoices.playerone_choice === this.choices[2]) {
                switch (this.playersChoices.playertwo_choice) {
                    case this.choices[0]:
                        return { "player": false, "opponent": true }
                    case this.choices[1]:
                        return { "player": true, "opponent": false }
                    default:
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
        const r = this.result();
        if (this.choices.includes(this.botChoice)) {
            const text = `\`1:\` ${this.args}\n\`2:\` ${this.botChoice}`;
            if (r.player === false && r.opponent === false) {
                this.message.channel.send(`${text}\n${this.messages.drawText}`);
            }
            else if (r.player === true) {
                this.message.channel.send(`${text}\n${this.messages.userWinnerText}`);
            }
            else if (r.opponent === true) {
                this.message.channel.send(`${text}\n${this.messages.botWinnerText}`);
            }
        } else {
            const text = `\`1:\` ${this.playersChoices.playerone_choice}
\`2:\` ${this.playersChoices.playertwo_choice}`;
            if (r.player === false && r.opponent === false) {
                this.message.channel.send(`${text}\n${this.messages.drawText}`);
            }
            else if (r.player === true) {
                this.message.channel.send(`${text}\n${this.messages.userWinnerText}`);
            }
            else if (r.opponent === true) {
                this.message.channel.send(`${text}\n${this.messages.opponentWinnerText}`);
            }
            this.#updateGame();
        }
    }
}
