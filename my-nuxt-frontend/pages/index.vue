<script setup>
const { data: portfolios, error } = await useFetch('http://localhost:1337/api/portfolios?populate=*');
</script>

<style scoped>
@import '@/css/style.css';
</style>

<template>
  <div class="container">
    <h1>My Portfolio</h1>

    <div v-if="error">
      <p>There was an error fetching the portfolio data.</p>
    </div>

    <div v-else-if="!portfolios || !portfolios.data || portfolios.data.length === 0">
      <p>Loading...</p>
    </div>

    <ul v-else>
      <li v-for="portfolio in portfolios.data" :key="portfolio.id">
        <h2>{{ portfolio.Title || 'Untitled' }}</h2>
        <p>{{ portfolio.Description || 'No description available' }}</p>
        
        <!-- Display Image if Available -->
        <img 
          v-if="portfolio.Image?.url"
          :src="'http://localhost:1337' + portfolio.Image.url"
          alt="Portfolio Image"
          class="portfolio-image"
        />
        <p v-else>No image available</p>
      </li>
    </ul>
  </div>
</template>

<style>
.container { max-width: 600px; margin: auto; text-align: center; }
img.portfolio-image { max-width: 100%; height: auto; }
</style>
