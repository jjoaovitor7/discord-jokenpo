class Jokenpo {
    /**
     * @class Jokenpo
     * @constructor
     * @param {string} failCommandText 
     * @param {string} lang 
     * @param {string} drawText 
     * @param {string} botWinnerText 
     * @param {string} userWinnerText 
     * @param {Object} message 
     * @param {string} args 
     */
    constructor(failCommandText, lang, drawText, botWinnerText, userWinnerText, message, args) {
        this.failCommandText = failCommandText;
        this.lang = lang;
        this.drawText = drawText;
        this.botWinnerText = botWinnerText;
        this.userWinnerText = userWinnerText;
        this.message = message;
        this.args = args;
        this.options;
        this.optionSelectedBot;
    }

    /**
     * @method Jokenpo.play
     */
    play() {
        if (this.args == "") {
            this.message.channel.send(this.failCommandText);
        }

        else {
            if (this.lang == "en") {
                this.options = ["rock", "paper", "scissors"];
            }
            else {
                this.options = ["pedra", "papel", "tesoura"];
            }

            if (this.args == this.options[0]) {
                this.optionSelectedBot = this.options[Math.floor(Math.random() * 3)];
                this.result();
            }
            else if (this.args == this.options[1]) {
                this.optionSelectedBot = this.options[Math.floor(Math.random() * 3)];
                this.result();
            }
            else if (this.args == this.options[2]) {
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
        if (this.args == this.options[0]) {
            if (this.optionSelectedBot == this.options[1]) {
                return { player: false, bot: true }
            }
            else if (this.optionSelectedBot == this.options[2]) {
                return { player: true, bot: false }
            }
            else {
                return { player: false, bot: false }
            }
        }

        else if (this.args == this.options[1]) {
            if (this.optionSelectedBot == this.options[0]) {
                return { player: true, bot: false }
            }
            else if (this.optionSelectedBot == this.options[2]) {
                return { player: false, bot: true }
            }
            else {
                return { player: false, bot: false }
            }
        }

        else if (this.args == this.options[2]) {
            if (this.optionSelectedBot == this.options[0]) {
                return { player: false, bot: true }
            }
            else if (this.optionSelectedBot == this.options[1]) {
                return { player: true, bot: false }
            }
            else {
                return { player: false, bot: false }
            }
        }
    }

    /**
 * @method Jokenpo.send
 */
    send() {
        if (this.result().player == false && this.result().bot == false) {
            this.message.channel.send(this.drawText);
        }
        else if (this.result().player == true) {
            this.message.channel.send(this.userWinnerText);
        }
        else if (this.result().bot == true) {
            this.message.channel.send(this.botWinnerText);
        }
    }
}

module.exports = Jokenpo;
