<template>
  <div id="app">
    <!-- Start Page -->
    <div v-if="!quizStarted && !quizFinished" class="start-page">
      <h1>{{title}}</h1>
      <button @click="startQuiz" class="start-button">Attempt Quiz</button>
    </div>

    <!-- Quiz Content -->
    <div v-if="quizStarted && !quizFinished" class="quiz-container">
      <!-- Fixed Header -->
      <div class="fixed-header">
        <h2>{{title}}</h2>
        <p>Time Left: {{ formatTime(timeLeft) }}</p>
        <p>Questions Attempted: {{ attemptedCount }} / {{ totalQuestions }}</p>
      </div>

      <!-- Questions List -->
      <div class="quiz-content">
        <div v-for="(question, index) in questions" :key="question.id" class="question-box">
          <p><strong>Question {{ index + 1 }}:</strong> {{ question.description }}</p>
          <div v-for="option in question.options" :key="option.id" class="option">
            <input 
              type="radio" 
              :value="option.id" 
              v-model="selectedAnswers[question.id]" 
              :id="`question-${question.id}-option-${option.id}`"
              class="option-radio"
            />
            <label :for="`question-${question.id}-option-${option.id}`" class="option-label">
              {{ option.description }}
            </label>
          </div>
          <button @click="clearAnswer(question.id)" class="clear-button">Clear Answer</button>
        </div>
        <button @click="submitQuiz" class="submit-button">Submit Quiz</button>
      </div>
    </div>

    <!-- Results Page -->
    <div v-if="quizFinished" class="results-page">
      <h1>{{title}}</h1>
      <h2>Quiz Results</h2>
      <p>Your Score: {{ score }} / {{ totalQuestions }}</p>
      <p>Questions Attempted: {{ attemptedCount }} / {{ totalQuestions }}</p>
      <p>{{ resultMessage }}</p>
      <button @click="retryQuiz" class="retry-button">Retry Quiz</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      questions: [],
      selectedAnswers: {},
      quizStarted: false,
      quizFinished: false,
      timeLeft: 600,
      attemptedCount: 0,
      totalQuestions: 10,
      score: 0,
      timerInterval: null,
    };
  },
  methods: {
    fetchQuizData() {
      axios.get('https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX')
        .then(response => {
          this.questions = response.data.questions;
          this.title = response.data.title;
          document.title = this.title || 'Default Title';
        })
        .catch(error => console.error('Error fetching quiz data:', error));
    },

    startQuiz() {
      this.quizStarted = true;
      this.quizFinished = false;
      this.startTimer();
    },

    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.submitQuiz();
        }
      }, 1000);
    },

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    },

    countAttemptedQuestions() {
      this.attemptedCount = Object.keys(this.selectedAnswers).filter(
        (id) => this.selectedAnswers[id] !== undefined
      ).length;
    },

    submitQuiz() {
      clearInterval(this.timerInterval);
      this.score = this.calculateScore();
      this.quizFinished = true;
    },

    calculateScore() {
      let score = 0;
      this.questions.forEach(question => {
        const selectedAnswerId = this.selectedAnswers[question.id];
        const correctOption = question.options.find(option => option.is_correct);
        if (selectedAnswerId === correctOption.id) {
          score++;
        }
      });
      return score;
    },

    clearAnswer(questionId) {
      this.selectedAnswers[questionId] = undefined; // Directly reset the selected answer for this question
    },

    retryQuiz() {
      this.quizStarted = false;
      this.quizFinished = false;
      this.selectedAnswers = {};
      this.timeLeft = 600;
      this.attemptedCount = 0;
      this.score = 0;
    },
  },

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
    },
  },

  watch: {
    selectedAnswers: {
      handler() {
        this.countAttemptedQuestions();
      },
      deep: true,
    },
  },

  created() {
    this.fetchQuizData();
  },
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
}

/* Start Page */
.start-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  text-align: center;
}

.start-button {
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}

/* Fixed Header */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #e2ded0;
  padding: 15px;
  box-shadow: 0px 0px 10px rgb(58, 58, 47);
  text-align: center;
  z-index: 1000;
}

/* Push content down so it's not hidden under the fixed header */
.quiz-content {
  margin-top: 200px;
  padding: 20px;
}

/* Question Box */
.question-box {
  background-color: #fffff5;
  padding: 15px;
  margin: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.option {
  margin-top: 5px;
}

.option-radio {
  display: none;
}

.option-label {
  display: inline-block;
  padding: 12px 20px;
  margin: 5px 0;
  background-color:#f9f9fb;
  border: 2px solid #ccc;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.2s, border 0.2s;
  font-size: 16px;
  width: 250px;
}

.option-radio:checked + .option-label {
  background-color: #b59f84;
  border-color: #b59f84;
  color: white;
}

.option-label:hover {
  background-color: #f1f1f1;
  border-color: #999;
}

/* Buttons */
.submit-button, .retry-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}
.clear-button{
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color:rgb(202, 76, 76);
  color: white;
  border: none;
  border-radius: 5px;
}

/* Results Page */
.results-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  text-align: center;
}
</style>
