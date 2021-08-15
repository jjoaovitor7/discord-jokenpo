class Jokenpo {
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

    result() {
        if (this.args == this.options[0]) {
            if (this.optionSelectedBot == this.options[1]) {
                this.message.channel.send(this.botWinnerText);
                return { player: false, bot: true }
            }
            else if (this.optionSelectedBot == this.options[2]) {
                this.message.channel.send(this.userWinnerText);
                return { player: true, bot: false }
            }
            else {
                this.message.channel.send(this.drawText);
                return { player: false, bot: false }
            }
        }

        else if (this.args == this.options[1]) {
            if (this.optionSelectedBot == this.options[0]) {
                this.message.channel.send(this.userWinnerText);
                return { player: true, bot: false }
            }
            else if (this.optionSelectedBot == this.options[2]) {
                this.message.channel.send(this.botWinnerText);
                return { player: false, bot: true }
            }
            else {
                this.message.channel.send(this.drawText);
                return { player: false, bot: false }
            }
        }

        else if (this.args == this.options[2]) {
            if (this.optionSelectedBot == this.options[0]) {
                this.message.channel.send(this.botWinnerText);
                return { player: false, bot: true }
            }
            else if (this.optionSelectedBot == this.options[1]) {
                this.message.channel.send(this.userWinnerText);
                return { player: true, bot: false }
            }
            else {
                this.message.channel.send(this.drawText);
                return { player: false, bot: false }
            }
        }
    }
}

module.exports = Jokenpo;
