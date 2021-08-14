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

            function setWinner(drawText, botWinnerText, userWinnerText) {
                let optionBot = options[Math.floor(Math.random() * 3)];
                if (optionBot == options[0]) {
                   this.message.channel.send(drawText);
                }

                if (optionBot == options[1]) {
                   this.message.channel.send(botWinnerText);
                }

                if (optionBot == options[2]) {
                   this.message.channel.send(userWinnerText);
                }
            }

            if (args[0] == options[0]) {
                setWinner(this.drawText, this.botWinnerText, this.userWinnerText);
            }
            else if (args[0] == options[1]) {
                setWinner(this.drawText, this.botWinnerText, this.userWinnerText);
            }
            else if (args[0] == options[2]) {
                setWinner(this.drawText, this.botWinnerText, this.userWinnerText);
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
