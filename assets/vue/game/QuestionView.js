export default {
    data: function() {
        return {
            answered: false,
            countDown: this.timer,
        }
    },
    created() {
        this.countDownTimer()
    },
    methods: {
        countDownTimer() {
            if (this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        },
        postAnswer(answerId) {
            let ref = this
            ref.answered = true
            io.socket.post(
                "/game/" + this.sessionid + "/answer/" + answerId,
            )
        }
    },
    props: ['question', 'timer', 'sessionid'],
    template: `
    <div>
        <h1>Counter: {{ countDown }}</h1>
        <h1>{{ question.title }}</h1>

        <p>{{ question.question }}</p>

        <h2 v-if="answered">Danke, die Scores werden angezeigt, sobald den Counter abläuft!</h2>
        <ul 
            v-for="answer in question.answers"
            :key="answer.id"
            v-else
        >
            <li>
                <a @click="postAnswer(answer.id)" class="answer-container">
                    {{ answer.text }}
                </a>
            </li>
        </ul>
    </div>
    `
}
