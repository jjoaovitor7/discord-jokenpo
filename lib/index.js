class Jokenpo {

    /**
     * @class Jokenpo
     * @constructor
     * @param {string} failCommandText - Fail Command Text Message
     * @param {string} lang - Language
     * @param {string} drawText - Draw Text Message
     * @param {string} botWinnerText - Bot Winner Text Message
     * @param {string} userWinnerText - User Winner Text Message
     * @param {Object} message - Discord "message" Object
     * @param {string} args - Option
     */

    constructor(failCommandText, lang,
        drawText, botWinnerText, userWinnerText,
        message, args) {
        this.failCommandText = failCommandText;
        this.lang = lang;
        this.drawText = drawText;
        this.botWinnerText = botWinnerText;
        this.userWinnerText = userWinnerText;
        this.message = message;
        this.args = args;
        this.options = null;
        this.optionSelectedBot = null;
        this.players = null;
    }

    /**
     * @method Jokenpo.play
     * @returns {undefined}
     */
    play() {
        if (this.args === "") {
            this.message.channel.send(this.failCommandText);
        }

        else {
            if (this.lang === "en") {
                this.options = ["rock", "paper", "scissors"];
            }
            else {
                this.options = ["pedra", "papel", "tesoura"];
            }

            if (this.args === this.options[0]) {
                this.optionSelectedBot = this.options[Math.floor(Math.random() * 3)];
                this.result();
            }
            else if (this.args === this.options[1]) {
                this.optionSelectedBot = this.options[Math.floor(Math.random() * 3)];
                this.result();
            }
            else if (this.args === this.options[2]) {
                this.optionSelectedBot = this.options[Math.floor(Math.random() * 3)];
                this.result();
            }
            else {
                this.message.channel.send(
                    this.failCommandText
                );
            }
        }
    }

    /**
     * @method Jokenpo.result
     * @returns {Object}
     */
    result() {
        if (this.args === this.options[0]) {
            if (this.optionSelectedBot === this.options[1]) {
                return { "player": false, "bot": true }
            }
            else if (this.optionSelectedBot === this.options[2]) {
                return { "player": true, "bot": false }
            }
            else {
                return { "player": false, "bot": false }
            }
        }

        else if (this.args === this.options[1]) {
            if (this.optionSelectedBot === this.options[0]) {
                return { "player": true, "bot": false }
            }
            else if (this.optionSelectedBot == this.options[2]) {
                return { "player": false, "bot": true }
            }
            else {
                return { "player": false, "bot": false }
            }
        }

        else if (this.args === this.options[2]) {
            if (this.optionSelectedBot === this.options[0]) {
                return { "player": false, "bot": true }
            }
            else if (this.optionSelectedBot === this.options[1]) {
                return { "player": true, "bot": false }
            }
            else {
                return { "player": false, "bot": false }
            }
        }
    }

    /**
     * @method Jokenpo.send
     * @returns {undefined}
     */
    send() {
        if (this.result().player === false && this.result().bot === false) {
            this.message.channel.send(this.drawText);
        }
        else if (this.result().player === true) {
            this.message.channel.send(this.userWinnerText);
        }
        else if (this.result().bot === true) {
            this.message.channel.send(this.botWinnerText);
        }
    }
}

module.exports = Jokenpo;
