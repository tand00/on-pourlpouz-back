var SOURCES = require('./generators');

class Room {

    static waitingTime = 5000;

    status = "not-started";
    answers = [];
    question = {};

    constructor(name) {
        this.name = name;
    }

    getStatus() {
        let answers = (this.status === "revealing") ? this.answers : {};
        return {
            result: true,
            state: this.status,
            name: this.name,
            answers: answers,
            question: this.question,
            token: Math.random()
        };
    }

    registerAnswer(answer) {
        this.answers.push(answer);
    }

    async startNextQuestion() {
        this.status = "waiting";
        await this.generateQuestion();
        let that = this;
        setTimeout(function() {
            that.nextState();
        }, Room.waitingTime);
    }

    async nextState() {
        console.log("YOUPI");
        console.log(this);
        console.log(this.status);
        const current_state = this.status;
        switch(current_state) {
            case "not-started":
            case "revealing":
                await this.startNextQuestion();
                break;
            case "waiting":
                this.status = "revealing";
                console.log("bah");
                break;
        }
        console.log(this.status);
    }

    async pass() {
        if(this.status !== "waiting") return;
        await this.startNextQuestion();
    }

    async generateQuestion() {
        let source = SOURCES[Math.floor(Math.random() * SOURCES.length)];
        let question = source.question;
        let link = await source.generator();
        this.question = {
            text: question,
            image: link
        };
    }

}

module.exports = Room;