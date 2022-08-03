class Jokenpo {

    /**
     * @class Jokenpo
     * @constructor
     * @param {Object} message - Discord "message" Object
     */

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
            timeoutText: "Timeout Text",
        }
        this.lang = "en";
        this.message = message;
        this.choices = null;
        this.botChoice = null;
        this.players = null;
        this.playersChoices = { "playerone_choice": null, "playertwo_choice": null }
        this.game = new Object();
        this.gameFile = null;
    }

    /**
     * @method Jokenpo.setMessages
     * @param {Object} gameResults - Game Results Text Messages
     * @param {Object} gameStatus - Game Status Text Messages
     * @param {Object} messageTo - Message To Text Messages
     * @returns {undefined}
     */
    setMessages(messages) {
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
     * @method Jokenpo.setMessages
     * @param {string} lang - Language
     * @returns {undefined}
     */
    setLang(lang) {
        this.lang = lang;
    }

    /**
     * @method Jokenpo.play
     * @param {string} args - Choice
     * @returns {undefined|Promise}
     */
    async play(args) {
        if (args !== undefined) {
            this.args = args.trim();
            if (this.message.mentions !== undefined) {
                this.user = this.message.mentions.users.first();
            }

            if (this.args === "" && user == undefined) {
                this.message.channel.send(this.messages.failCommandText);
            }
            else {
                this.lang == "en" ? this.choices = ["rock", "paper", "scissors"] : this.choices = ["pedra", "papel", "tesoura"];

                if (this.args !== "") {
                    if (this.user === undefined) {
                        this.players = 1;
                        if (this.players === 1) {
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
                        }
                    }
                    else if (this.user !== undefined && !(this.user.bot)) {
                        const fs = require('fs');
                        let exists;

                        try {
                            exists = await fs.promises.stat("./game.json");
                            if (exists.isFile("game.json")) {
                                this.gameFile = JSON.parse(fs.readFileSync("./game.json", "utf8"));
                            }
                        }
                        catch (err) {
                            fs.writeFileSync("./game.json", JSON.stringify({}), { flag: 'wx' });
                            exists = await fs.promises.stat("./game.json");
                            if (exists.isFile("game.json")) {
                                this.gameFile = JSON.parse(fs.readFileSync("./game.json", "utf8"));
                            }
                        }

                        if (this.message.guild != undefined && this.gameFile[this.message.guild.id] === undefined && this.message.guild !== null && this.game[this.message.guild.id] === undefined) {
                            if (this.game[this.message.guild.id] === this.message.author.id) {
                                this.message.channel.send(this.messages.gameInProgressText);
                            }
                            else {
                                this.game[this.message.guild.id] = this.message.author.id;
                                Object.assign(this.gameFile, this.game);
                                fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
                            }

                            this.players = 2;
                            if (this.players === 2) {
                                if (!(this.message.author.id === this.user.id) && !(this.user.bot)) {
                                    const message = await this.message.author.send(this.messages.messageToUserText);
                                    const msg_1 = await message.channel.awaitMessages({
                                        filter: () => this.message.author.id === message.channel.recipient.id,
                                        max: 1, time: 60_000, errors: ['time']
                                    }).catch(() => {
                                        delete this.game[this.message.guild.id];
                                        delete this.gameFile[this.message.guild.id];
                                        const fs = require("fs");
                                        fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
                                        this.message.author.send(this.messages.timeoutText);
                                        this.message.channel.send(this.messages.gameCancelText);
                                    });

                                    const message_2 = await this.message.guild.members.cache.get(this.user.id)
                                        .send(this.messages.messageToOponnentText);
                                    const msg_2 = await message_2.channel.awaitMessages({
                                        filter: () => this.user.id === message_2.channel.recipient.id,
                                        max: 1, time: 60_000, errors: ['time']
                                    }).catch(() => {
                                        delete this.game[this.message.guild.id];
                                        delete this.gameFile[this.message.guild.id];
                                        const fs = require("fs");
                                        fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
                                        this.message.author.send(this.messages.timeoutText);
                                        this.message.channel.send(this.messages.gameCancelText);
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
                                } else {
                                    this.message.channel.send(this.messages.failCommandText);
                                }
                            }
                        } else {
                            this.message.channel.send(this.messages.gameInProgressText);
                        }
                    }
                }
            }
        } else {
            this.message.channel.send(this.messages.failCommandText);
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
     * @method Jokenpo.getPlayersChoices
     * @returns {Object}
     */
    getPlayersChoices() {
        return this.playersChoices;
    }

    /**
     * @method Jokenpo.result
     * @returns {Object}
     */
    result() {
        if (this.players === 1) {
            let r = null;
            if (this.args === this.choices[0]) {
                switch (this.botChoice) {
                    case this.choices[1]:
                        r = { "player": false, "opponent": true }
                        break;
                    case this.choices[2]:
                        r = { "player": true, "opponent": false }
                        break;
                    default:
                        r = { "player": false, "opponent": false }
                        break;
                }
            }

            else if (this.args === this.choices[1]) {
                switch (this.botChoice) {
                    case this.choices[0]:
                        r = { "player": true, "opponent": false }
                        break;
                    case this.choices[2]:
                        r = { "player": false, "opponent": true }
                        break;
                    default:
                        r = { "player": false, "opponent": false }
                        break;
                }
            }

            else if (this.args === this.choices[2]) {
                switch (this.botChoice) {
                    case this.choices[0]:
                        r = { "player": false, "opponent": true }
                        break;
                    case this.choices[1]:
                        r = { "player": true, "opponent": false }
                        break;
                    default:
                        r = { "player": false, "opponent": false }
                        break;
                }
            }

            return r;
        }
        else if (this.players === 2) {
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
        if (this.players === 1) {
            if (this.result().player === false && this.result().opponent === false) {
                this.message.channel.send(`\`1:\` ${this.args}\n\`2:\` ${this.botChoice}\n${this.messages.drawText}`);
            }
            else if (this.result().player === true) {
                this.message.channel.send(`\`1:\` ${this.args}\n\`2:\` ${this.botChoice}\n${this.messages.userWinnerText}`);
            }
            else if (this.result().opponent === true) {
                this.message.channel.send(`\`1:\` ${this.args}\n\`2:\` ${this.botChoice}\n${this.messages.botWinnerText}`);
            }
        }
        else if (this.players === 2) {
            if (this.result().player === false && this.result().opponent === false) {
                this.message.channel.send(`\`1:\` ${this.playersChoices.playerone_choice}
\`2:\` ${this.playersChoices.playertwo_choice}
${this.messages.drawText}`);
            }
            else if (this.result().player === true) {
                this.message.channel.send(`\`1:\` ${this.playersChoices.playerone_choice}
\`2:\` ${this.playersChoices.playertwo_choice}
${this.messages.userWinnerText}`);
            }
            else if (this.result().opponent === true) {
                this.message.channel.send(`\`1:\` ${this.playersChoices.playerone_choice}
\`2:\` ${this.playersChoices.playertwo_choice}
${this.messages.opponentWinnerText}`);
            }

            delete this.game[this.message.guild.id];
            delete this.gameFile[this.message.guild.id];
            const fs = require("fs");
            fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
        }
    }
}

module.exports = Jokenpo;
