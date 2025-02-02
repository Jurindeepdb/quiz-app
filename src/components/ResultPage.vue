<template>
  <div class="result-page">
    <h1>Quiz Results</h1>
    <p>Your Score: {{ score }} / 10</p>
    <p>Questions Attempted: {{ attemptedCount }} / 10</p>
    <p>{{ resultMessage }}</p>
    <button @click="retryQuiz" class="retry-button">Retry Quiz</button>
  </div>
</template>

<script>
export default {
  props: ['score', 'attemptedCount'],
  computed: {
    resultMessage() {
      if (this.score >= 10) {
        return 'Perfect!';
      } else if (this.score >= 8) {
        return 'Excellent!';
      } else if (this.score >= 6) {
        return 'Great!';
      } else if (this.score >= 4) {
        return 'Yay! You passed!';
      } else {
        return 'Sorry, you failed.';
      }
    }
  },
  methods: {
    retryQuiz() {
      this.$router.push({ name: 'QuizPage' });
    }
  }
};
</script>

<style scoped>
.result-page {
  text-align: center;
  margin-top: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

p {
  font-size: 1.5em;
  font-weight: bold;
  color: green;
}

.retry-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
