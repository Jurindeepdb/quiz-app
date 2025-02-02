import { createRouter, createWebHistory } from 'vue-router'
import QuizPage from '../components/QuizPage.vue'
import ResultPage from '../components/ResultPage.vue'

const routes = [
  { path: '/quiz', component: QuizPage, name: 'QuizPage' },
  { path: '/result', component: ResultPage, name: 'ResultPage' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
