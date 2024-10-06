<template>
  <div class="exam">
    <Question
      v-if="currentQuestion"
      :question="currentQuestion"
      @answerSelected="handleAnswer"
    />
    <div v-if="examFinished">
      <h3>Exam Completed!</h3>
      <p>Your score: {{ score }}/{{ examQuestions.length }}</p>
      <router-link to="/">
        <button class="button" style="vertical-align:middle"><span>Home</span></button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Question from "@/components/Question.vue";
import store from "@/store/store"; // Import Vuex store to access loggedInUser

export default {
  components: { Question },
  data() {
    return {
      currentQuestionIndex: 0,
      examId: this.$route.params.id,
      examQuestions: [],
      score: 0,
      examFinished: false,
      username: store.state.loggedInUser, // Get the logged-in user from Vuex store
    };
  },
  computed: {
    currentQuestion() {
      return this.examQuestions[this.currentQuestionIndex];
    }
  },
  methods: {
    fetchQuestions() {
      fetch("http://localhost:3000/questions")
        .then(response => response.json())
        .then(data => {
          this.examQuestions = data.filter(question => question["exam_id"] === this.examId);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },
    handleAnswer(selectedOption, correctAnswer) {
      const currentQuestion = this.examQuestions[this.currentQuestionIndex];

      const userAnswer = {
        username: this.username, // Add the logged-in user to the result
        question_id: currentQuestion.id,
        answer_index: selectedOption
      };

      // Send user answer to the server
      fetch("http://localhost:3000/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAnswer),
      })
        .then(response => response.json())
        .catch(error => {
          console.error("Error saving answer:", error);
        });

      // Check if the answer is correct and update the score
      if (selectedOption === correctAnswer) {
        this.score++;
      }

      // Move to the next question
      this.currentQuestionIndex++;

      // If the exam is finished, save the score
      if (this.currentQuestionIndex >= this.examQuestions.length) {
        this.examFinished = true;

        const userScore = {
          username: this.username, // Add the logged-in user to the score
          exam_id: this.examId,
          score: this.score
        };

        // Send user score to the server
        fetch("http://localhost:3000/scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userScore),
        })
        .then(response => response.json())
        .catch(error => {
          console.error("Error saving score:", error);
        });
      }
    }
  },
  mounted() {
    this.fetchQuestions();
  }
};
</script>