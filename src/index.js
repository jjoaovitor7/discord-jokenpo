class Jokenpo {
    constructor(failCommandText, lang, drawText, botWinnerText, userWinnerText, message, args) {
        this.failCommandText = failCommandText;
        this.lang = lang;
        this.drawText = drawText;
        this.botWinnerText = botWinnerText;
        this.userWinnerText = userWinnerText;
        this.message = message;
        this.args = args;
    }

    play() {
        if (this.args == "") {
            this.message.channel.send(this.failCommandText);
        }

        else {
            let options;
            if (this.lang == "en") {
                options = ["rock", "paper", "scissors"];
            }
            else {
                options = ["pedra", "papel", "tesoura"];
            }

            function setWinner(message, drawText, botWinnerText, userWinnerText) {
                let optionSelectedBot = options[Math.floor(Math.random() * 3)];
                if (optionSelectedBot == options[0]) {
                    message.channel.send(drawText);
                    return { player: false, bot: false }
                }

                if (optionSelectedBot == options[1]) {
                    message.channel.send(botWinnerText);
                    return { player: false, bot: true }
                }

                if (optionSelectedBot == options[2]) {
                    message.channel.send(userWinnerText);
                    return { player: true, bot: false }
                }
            }

            if (this.args == options[0]) {
                return setWinner(this.message, this.drawText, this.botWinnerText, this.userWinnerText);
            }
            else if (this.args == options[1]) {
                return setWinner(this.message, this.drawText, this.botWinnerText, this.userWinnerText);
            }
            else if (this.args == options[2]) {
                return setWinner(this.message, this.drawText, this.botWinnerText, this.userWinnerText);
            }
            else {
                this.message.channel.send(
                    this.failCommandText
                );
            }
        }
    }
}

module.exports = Jokenpo;
