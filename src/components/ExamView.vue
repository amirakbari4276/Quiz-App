<template>
  <div class="exams">
      <div class="exam-box" v-for="exam in exams" :key="exam.id">
        <router-link :to="{name: 'exam', params:{ id: exam.id }}" style="text-decoration: none;">
          <img :src="`images/photo (${exam.id}).jpg`" alt="" class="img-exam">
          <h1>{{ exam.title }}</h1>
        </router-link>  
        <p>exam time: {{ exam.time }} min </p>
      </div>
  </div>
</template>
  
  <script>
  
  export default {
    props: {                 
      exams: Object,
    },
    methods: {
      emitAnswer(optionIndex) {
        this.$emit('answerSelected', optionIndex);
      },
    },
  };
  </script>
  

