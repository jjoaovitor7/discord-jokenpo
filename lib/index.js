const fs = require("fs");

module.exports = class Jokenpo {
    /**
     * @class Jokenpo
     * @constructor
     * @param {Object} message - Discord "message" Object
     */

    #lang;
    #choicesAvailable;
    #choices;

    constructor(message) {
        this.messages = {
            fail: "Fail Command Text",
            gameInProgress: "Game in Progress Text",
            gameCancel: "Game Cancel Text",
            toUser: "Message to User Text",
            toOpponent: "Message to Opponent Text",
            timeoutText: "Timeout Text"
        }
        this.#lang = "en";
        this.message = message;
        this.#choices = { "bot": null, "pone": null, "ptwo": null }
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
            fail: messages.fail,
            gameInProgress: messages.gameStatus.inProgress,
            gameCancel: messages.gameStatus.cancel,
            toUser: messages.messageTo.user,
            toOpponent: messages.messageTo.opponent,
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
     * @method Jokenpo.getChoices
     * @returns {Object}
     */
    getChoices() {
        return { "bot": this.#choices.bot, "pone": this.#choices.pone, "ptwo": this.#choices.ptwo }
    }

    /**
     * @method Jokenpo.play
     * @param {string} args - Choice
     * @returns {undefined|Promise}
     */
    async play(args) {
        this.args = args;
        this.#lang == "en" ? this.#choicesAvailable = ["rock", "paper", "scissors"] : this.#choicesAvailable = ["pedra", "papel", "tesoura"];

        if ((this.message.mentions.users.first() === undefined || this.message.mentions.users.first() === null) && this.#choicesAvailable.includes(this.args)) {
            this.#choices.pone = args;
            switch (this.args) {
                case this.#choicesAvailable[0]:
                    this.#choices.bot = this.#choicesAvailable[Math.floor(Math.random() * 3)];
                    break;
                case this.#choicesAvailable[1]:
                    this.#choices.bot = this.#choicesAvailable[Math.floor(Math.random() * 3)];
                    break;
                case this.#choicesAvailable[2]:
                    this.#choices.bot = this.#choicesAvailable[Math.floor(Math.random() * 3)];
                    break;
                default:
                    this.message.channel.send(this.messages.fail);
                    break;
            }

            return new Promise((resolve, reject) => {
                if (this.#choices.bot === null) {
                    reject();
                } else {
                    resolve();
                }
            });
        } else if (this.message.mentions.users.first() !== undefined && !(this.message.mentions.users.first().bot)) {
            this.user = this.message.mentions.users.first();
            this.#choices.bot = null;
            await fs.promises.stat("./game.json").catch(() => {
                fs.writeFileSync("./game.json", JSON.stringify({}), { flag: 'wx' });
            });

            this.game = JSON.parse(fs.readFileSync("./game.json", "utf8"));

            if (this.game[this.message.guild.id] === undefined) {
                if (this.game[this.message.guild.id] === this.message.author.id) {
                    this.message.channel.send(this.messages.gameInProgress);
                } else {
                    let aux = Object();
                    aux[this.message.guild.id] = this.message.author.id;
                    Object.assign(this.game, aux);
                    fs.writeFileSync("./game.json", JSON.stringify(this.game, 4, "\t"));
                }

                if (this.#choices.bot === null) {
                    const timeout = () => {
                        this.#updateGame();
                        this.message.author.send(this.messages.timeoutText);
                        this.message.channel.send(this.messages.gameCancel);
                    }

                    if (!(this.message.author.id === this.user.id) && !(this.user.bot)) {
                        const message = await this.message.author.send(this.messages.toUser);
                        const msg_1 = await message.channel.awaitMessages({
                            filter: () => this.message.author.id === message.channel.recipient.id,
                            max: 1, time: 60_000, errors: ['time']
                        }).catch(() => {
                            timeout();
                        });

                        const message_2 = await this.message.guild.members.cache.get(this.user.id)
                            .send(this.messages.toOpponent);
                        const msg_2 = await message_2.channel.awaitMessages({
                            filter: () => this.user.id === message_2.channel.recipient.id,
                            max: 1, time: 60_000, errors: ['time']
                        }).catch(() => {
                            timeout();
                        });

                        this.#choices.pone = msg_1.first().content;
                        this.#choices.ptwo = msg_2.first().content;

                        return new Promise((resolve, reject) => {
                            if (this.#choices.pone === null || this.#choices.ptwo === null) {
                                reject();
                            } else {
                                resolve();
                            }
                        });
                    }
                }
            } else {
                this.message.channel.send(this.messages.gameInProgress);
            }
        } else {
            this.message.channel.send(this.messages.fail);
        }
    }

    /**
     * @method Jokenpo.result
     * @returns {Object}
     */
    result() {
        if (this.#choicesAvailable.includes(this.#choices.bot)) {
            if (this.args === this.#choicesAvailable[0]) {
                switch (this.#choices.bot) {
                    case this.#choicesAvailable[1]:
                        return { "player": false, "bot": true }
                    case this.#choicesAvailable[2]:
                        return { "player": true, "bot": false }
                    default:
                        return { "player": false, "bot": false }
                }
            }

            else if (this.args === this.#choicesAvailable[1]) {
                switch (this.#choices.bot) {
                    case this.#choicesAvailable[0]:
                        return { "player": true, "bot": false }
                    case this.#choicesAvailable[2]:
                        return { "player": false, "bot": true }
                    default:
                        return { "player": false, "bot": false }
                }
            }

            else if (this.args === this.#choicesAvailable[2]) {
                switch (this.#choices.bot) {
                    case this.#choicesAvailable[0]:
                        return { "player": false, "bot": true }
                    case this.#choicesAvailable[1]:
                        return { "player": true, "bot": false }
                    default:
                        return { "player": false, "bot": false }
                }
            }
        } else {
            this.#updateGame();
            if (this.#choices.pone === this.#choicesAvailable[0]) {
                switch (this.#choices.ptwo) {
                    case this.#choicesAvailable[1]:
                        return { "player1": false, "player2": true }
                    case this.#choicesAvailable[2]:
                        return { "player1": true, "player2": false }
                    default:
                        return { "player1": false, "player2": false }
                }
            }

            else if (this.#choices.pone === this.#choicesAvailable[1]) {
                switch (this.#choices.ptwo) {
                    case this.#choicesAvailable[0]:
                        return { "player1": true, "player2": false }
                    case this.#choicesAvailable[2]:
                        return { "player1": false, "player2": true }
                    default:
                        return { "player1": false, "player2": false }
                }
            }

            else if (this.#choices.pone === this.#choicesAvailable[2]) {
                switch (this.#choices.ptwo) {
                    case this.#choicesAvailable[0]:
                        return { "player1": false, "player2": true }
                    case this.#choicesAvailable[1]:
                        return { "player1": true, "player2": false }
                    default:
                        return { "player1": false, "player2": false }
                }
            }
        }
    }
}
