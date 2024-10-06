<template>
  <div>
    <h1>Online Exam</h1>
    <button class="button" style="vertical-align: middle" @click="handleLogout">
      Logout
    </button>

    <div class="main">
      <ExamView v-if="exams" :exams="exams" />
    </div>
  </div>
</template>

<script>
import ExamView from "@/components/ExamView.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { ExamView },
  data() {
    return {
      exams: [],
    };
  },
  computed: {
    ...mapState(["users"]),
  },
  methods: {
    ...mapActions(["logout", "fetchUsers"]),

    fetchQuizzes() {
      fetch("http://localhost:3000/exams")
        .then((response) => response.json())
        .then((data) => {
          this.exams = data;
        })
        .catch((error) => {
          console.error("Error fetching exams:", error);
        });
    },
    async handleLogout() {
      await this.logout();
      this.$router.push("/login");
    },
  },
  mounted() {
    this.fetchUsers();
    this.fetchQuizzes();
  },
};
</script>
