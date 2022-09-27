var SOURCES = require('./generators');

class Room {

    static waitingTime = 15000;

    status = "not-started";
    answers = [];
    question = {};
    start_time = 0;

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
            timing: {
                total_time: Room.waitingTime / 1000,
                remaining: (Room.waitingTime - (Date.now() - this.start_time))/1000
            }
        };
    }

    registerAnswer(answer) {
        this.answers.push(answer);
    }

    async startNextQuestion() {
        this.answers = [];
        this.status = "waiting";
        await this.generateQuestion();
        let that = this;
        this.start_time = Date.now();
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