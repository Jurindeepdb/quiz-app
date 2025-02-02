<template>
  <div>
    <h1>Home Page</h1>
    <button @click="$router.push('/quiz')">Start Quiz</button>
  </div>
</template>

<script>
export default {
  name: 'HomePage'  // Changed from 'Home' to 'HomePage'
}
</script>

<style scoped>
/* Add styles for Home page here */
</style>
