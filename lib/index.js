class Jokenpo {

    /**
     * @class Jokenpo
     * @constructor
     * @param {Object} message - Discord "message" Object
     * @param {string} args - Option
     */

    constructor(message, args) {
        this.failCommandText = "Fail Command Text";
        this.lang = "en";
        this.drawText = "Draw Text";
        this.botWinnerText = "Bot Winner Text";
        this.opponentWinnerText = "Opponent Winner Text";
        this.userWinnerText = "User Winner Text";
        this.gameInProgressText = "Game in Progress Text";
        this.gameCancelText = "Game Cancel Text"
        this.messageToUserText = "Message to User Text";
        this.messageToOponnentText = "Message to Opponent Text";
        this.timeoutText = "Timeout Text";
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
     * @method Jokenpo.setMessages
     * @param {Object} gameResults - Game Results Text Messages
     * @param {Object} gameStatus - Game Status Text Messages
     * @param {Object} messageTo - Message To Text Messages
     * @returns {undefined}
     */
    setMessages(messages) {
        this.failCommandText = messages.fail;
        this.drawText = messages.gameResults.draw;
        this.botWinnerText = messages.gameResults.botWinner;
        this.opponentWinnerText = messages.gameResults.opponentWinner;
        this.userWinnerText = messages.gameResults.userWinner;
        this.gameInProgressText = messages.gameStatus.inProgress;
        this.gameCancelText = messages.gameStatus.cancel;
        this.messageToUserText = messages.messageTo.user;
        this.messageToOponnentText = messages.messageTo.opponent;
        this.timeoutText = messages.messageTo.timeout;
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
     * @returns {undefined|Promise}
     */
    async play() {
        let user;
        if (this.message.mentions !== undefined) {
            user = this.message.mentions.users.first();
        }

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
                        }
                        else if (this.args === this.options[1]) {
                            this.optionBot = this.options[Math.floor(Math.random() * 3)];
                        }
                        else if (this.args === this.options[2]) {
                            this.optionBot = this.options[Math.floor(Math.random() * 3)];
                        }
                        else {
                            this.message.channel.send(
                                this.failCommandText
                            );
                        }
                    }
                }
                else if (user !== undefined && user.bot !== true) {
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

                    if (this.message.guild != undefined) {
                        if (this.gameFile[this.message.guild.id] === undefined) {
                            if (this.message.guild !== null) {
                                if (this.game[this.message.guild.id] === undefined) {
                                    if (this.game[this.message.guild.id] === this.message.author.id) {
                                        this.message.channel.send(this.gameInProgressText);
                                    }
                                    else {
                                        this.game[this.message.guild.id] = this.message.author.id;
                                        Object.assign(this.gameFile, this.game);
                                        fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
                                    }
                                }
                            }

                            this.players = 2;
                            if (this.players === 2) {
                                if (!(this.message.author.id === user.id) && user.bot !== true) {
                                    return this.message.author.send(this.messageToUserText).then(async (message) => {
                                        const filterPlayer1 = () => {
                                            return this.message.author.id === message.channel.recipient.id;
                                        }

                                        this.playersOptions.player1Option = await message.channel.awaitMessages(filterPlayer1, {
                                            max: 1,
                                            time: 60000,
                                            errors: ["time"]
                                        }).catch(() => {
                                            delete this.game[this.message.guild.id];
                                            delete this.gameFile[this.message.guild.id];
                                            const fs = require("fs");
                                            fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
                                            this.message.author.send(this.timeoutText);
                                            this.message.channel.send(this.gameCancelText);
                                            return 0;
                                        });
                                        try {
                                            this.playersOptions.player1Option = this.playersOptions.player1Option.first().content;
                                        } catch (TypeError) { }

                                        return this.message.guild.members.cache.get(user.id).send(this.messageToOponnentText).then(async (message) => {
                                            const filterPlayer2 = () => {
                                                return user.id === message.channel.recipient.id;
                                            }

                                            this.playersOptions.player2Option = await message.channel.awaitMessages(filterPlayer2, {
                                                max: 1,
                                                time: 60000,
                                                errors: ["time"]
                                            }).catch(() => {
                                                delete this.game[this.message.guild.id];
                                                delete this.gameFile[this.message.guild.id]; const fs = require("fs");
                                                fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
                                                this.message.author.send(this.timeoutText);
                                                this.message.channel.send(this.gameCancelText);
                                                return 0;
                                            });

                                            try {
                                                this.playersOptions.player2Option = this.playersOptions.player2Option.first().content;
                                            } catch (TypeError) { }

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
                            this.message.channel.send(this.gameInProgressText);
                        }
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
     * @method Jokenpo.getPlayersOptions
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
            let _result = null;
            if (this.args === this.options[0]) {
                if (this.optionBot === this.options[1]) {
                    _result = { "player": false, "opponent": true }
                }
                else if (this.optionBot === this.options[2]) {
                    _result =  { "player": true, "opponent": false }
                }
                else {
                    _result =  { "player": false, "opponent": false }
                }
            }

            else if (this.args === this.options[1]) {
                if (this.optionBot === this.options[0]) {
                    _result =  { "player": true, "opponent": false }
                }
                else if (this.optionBot == this.options[2]) {
                    _result =  { "player": false, "opponent": true }
                }
                else {
                    _result =  { "player": false, "opponent": false }
                }
            }

            else if (this.args === this.options[2]) {
                if (this.optionBot === this.options[0]) {
                    _result =  { "player": false, "opponent": true }
                }
                else if (this.optionBot === this.options[1]) {
                    _result =  { "player": true, "opponent": false }
                }
                else {
                    _result =  { "player": false, "opponent": false }
                }
            }
            return _result;
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
            try {
                if (this.result().player === false && this.result().opponent === false) {
                    this.message.channel.send(`\`1:\` ${this.args}\n\`2:\` ${this.optionBot}\n${this.drawText}`);
                }
                else if (this.result().player === true) {
                    this.message.channel.send(`\`1:\` ${this.args}\n\`2:\` ${this.optionBot}\n${this.userWinnerText}`);
                }
                else if (this.result().opponent === true) {
                    this.message.channel.send(`\`1:\` ${this.args}\n\`2:\` ${this.optionBot}\n${this.botWinnerText}`);
                }
            } catch (TypeError) { }
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
                delete this.gameFile[this.message.guild.id];
                const fs = require("fs");
                fs.writeFileSync("./game.json", JSON.stringify(this.gameFile, null, "\t"));
            } catch (TypeError) { }
        }
    }
}

module.exports = Jokenpo;
