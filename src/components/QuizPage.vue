<template>
  <div class="quiz-page">
    <div class="header">
      <h2 class="title">Quiz</h2>
      <h2 class="timer">Time Left: {{ formattedTime }}</h2>
      <h2 class="questions-attempted">Attempted: {{ questionsAttempted }} / 10</h2>
    </div>

    <div v-if="quizData.length" class="questions-container">
      <div v-for="(question, index) in quizData" :key="index" class="question-box">
        <p class="question-text">{{ index + 1 }}. {{ question.question }}</p>
        <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option">
          <input 
            type="checkbox" 
            :id="`question-${index}-option-${optIndex}`" 
            @change="toggleAnswer(index, optIndex)"
            class="option-checkbox"
          >
          <label :for="`question-${index}-option-${optIndex}`" class="option-label">{{ option }}</label>
        </div>
      </div>
      <button class="submit-button" @click="submitQuiz">Submit</button>
    </div>

    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      quizData: [],
      timer: 600,  // 10 minutes in seconds
      questionsAttempted: 0,
      selectedAnswers: [],
      timerInterval: null
    }
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  },
  created() {
    this.fetchQuizData();
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timerInterval);
  },
  methods: {
    async fetchQuizData() {
      try {
        const response = await axios.get('https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX');
        this.quizData = response.data.questions;
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.timerInterval);
          this.submitQuiz();
        }
      }, 1000);
    },
    toggleAnswer(questionIndex, optionIndex) {
      const answer = { questionIndex, optionIndex };
      const existingIndex = this.selectedAnswers.findIndex(
        item => item.questionIndex === questionIndex && item.optionIndex === optionIndex
      );

      if (existingIndex !== -1) {
        this.selectedAnswers.splice(existingIndex, 1);
      } else {
        this.selectedAnswers.push(answer);
      }

      this.updateAttemptedQuestions();
    },
    updateAttemptedQuestions() {
      const uniqueQuestions = new Set(this.selectedAnswers.map(ans => ans.questionIndex));
      this.questionsAttempted = uniqueQuestions.size;
    },
    
    submitQuiz() {
      const score = this.calculateScore();
      this.$router.push({ 
        name: 'ResultPage', 
        params: { 
          score: score, 
          attemptedCount: this.questionsAttempted 
        }
      });
    },

    calculateScore() {
      const score = this.selectedAnswers.length;
      console.log("Total selected answers: ", score);
      return score;
    }
  }
}
</script>

<style scoped>
.quiz-page {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

.questions-container {
  margin-top: 80px; /* Prevents overlap with fixed header */
}

.question-box {
  background: #f9f9f9;
  padding: 15px;
  margin: 10px 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.question-text {
  font-weight: bold;
}

.option {
  margin-top: 10px;
}

.option-checkbox {
  display: none; /* Hide the actual checkbox */
}

.option-label {
  display: inline-block;
  padding: 12px 20px;
  margin: 5px 0;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, border 0.2s;
  font-size: 16px;
}

.option-checkbox:checked + .option-label {
  background-color: #4CAF50;
  border-color: #4CAF50;
  color: white;
}

.option-label:hover {
  background-color: #f1f1f1;
  border-color: #999;
}

.submit-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

.loading {
  text-align: center;
  font-size: 18px;
}
</style>
