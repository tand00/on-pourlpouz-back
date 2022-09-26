import { SOURCES } from "./generators";

class Room {

    static waitingTime = 20000;

    status = "not-started";
    answers = {};
    question = {};

    getStatus() {
        let answers = (this.status === "revealing") ? this.answers : {};
        return {
            result: true,
            status: this.status,
            answers: answers,
            question: this.question
        };
    }

    registerAnswer(player, answer) {
        this.answers[player] = answer;
    }

    startNextQuestion() {
        this.status = "waiting";
        this.generateQuestion();
        setTimeout(nextState, Room.waitingTime);
    }

    nextState() {
        switch(this.status) {
            case "not-started":
            case "revealing":
                this.startNextQuestion();
                break;
            case "waiting":
                this.status = "revealing";
                break;
        }
    }

    pass() {
        if(this.status !== "waiting") return;
        this.startNextQuestion();
    }

    generateQuestion() {
        let source = SOURCES[Math.floor(Math.random() * SOURCES.length)];
        let question = source.question;
        let link = source.generator();
        this.question = {
            text: question,
            image: link
        };
    }

}