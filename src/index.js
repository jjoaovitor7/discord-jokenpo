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

    async play() {
        if (this.args == "") {
            await this.message.channel.send(this.failCommandText);
        }

        else {
            let options;
            if (this.lang == "en") {
                options = ["rock", "paper", "scissors"];
            }
            else {
                options = ["pedra", "papel", "tesoura"];
            }

            async function setWinner(drawText, botWinnerText, userWinnerText) {
                let optionBot = options[Math.floor(Math.random() * 3)];
                if (optionBot == options[0]) {
                    await this.message.channel.send(drawText);
                    return { player: false, bot: false }
                }

                if (optionBot == options[1]) {
                    await this.message.channel.send(botWinnerText);
                    return { player: false, bot: true }
                }

                if (optionBot == options[2]) {
                    await this.message.channel.send(userWinnerText);
                    return { player: true, bot: false }
                }
            }

            if (args == options[0]) {
                return setWinner(this.drawText, this.botWinnerText, this.userWinnerText);
            }
            else if (args == options[1]) {
                return setWinner(this.drawText, this.botWinnerText, this.userWinnerText);
            }
            else if (args == options[2]) {
                return setWinner(this.drawText, this.botWinnerText, this.userWinnerText);
            }
            else {
                await this.message.channel.send(
                    this.failCommandText
                );
            }
        }
    }
}

module.exports = Jokenpo;
