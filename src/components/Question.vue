<template>
  <div class="question">
    <h2>{{ question.question_text }}</h2>
    <Options 
      v-if="questionAnswers.length > 0" 
      :options="questionAnswers[0].answer" 
      @optionSelected="emitAnswer" 
    />
    <p v-else>Loading answers...</p>
  </div>
</template>

  
<script>
import Options from "@/components/Options.vue";

export default {
  props: {
    question: Object,
  },
  components: { Options },
  data() {
    return {
      questionAnswers: []
    }
  },
  methods: {
    fetchAnswers() {
      fetch("http://localhost:3000/answers")
      .then(response => response.json())
      .then(data => {
        this.questionAnswers = data.filter(answer => answer["question_id"] === this.question.id);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
    },
    emitAnswer(optionIndex) {
      this.$emit('answerSelected', optionIndex, this.questionAnswers[0].correct_answer );
    },
  },
  watch: {
    question: {
      immediate: true, 
      handler() {
        this.fetchAnswers();
      }
    }
  }
};
</script>
  