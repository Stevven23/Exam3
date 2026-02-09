<script setup>
import { useArticles } from './composables/useArticles.js'
import './assets/style.css'

const {
  searchTerm,
  articles,
  loading,
  error,
  searchArticles,
  generateReportPDF
} = useArticles()
</script>

<template>
  <div class="app-layout">
    <header class="search-section">
      <h1 class="app-title">Products</h1>

      <div class="search-container">
        <input
          v-model="searchTerm"
          @keyup.enter="searchArticles"
          placeholder="Search by product name, category or brand..."
          class="search-input"
        />
        <button @click="searchArticles" class="search-button">
          Search
        </button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </header>

    <main class="results-section">
      <div v-if="loading" class="loading">
        <p>Loading results...</p>
      </div>

      <div v-else-if="articles.length > 0" class="results-container">
        <div class="button-container">

          <p class="results-info">
            {{ articles.length }} articles found
          </p>
        </div>

        <div class="table-container">
          <table class="results-table">
            <thead>
              <tr>
                <th class="number-col">#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Brand</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="article in articles"
                :key="article.id"
                class="table-row"
              >
                <td class="number-col">{{ article.number }}</td>
                <td class="title-cell">{{ article.title }}</td>
                <td class="author-cell">{{ article.author }}</td>
                <td>{{ article.date }}</td>
                <td>{{ article.journal }}</td>
                <td class="price-cell">${{ article.doi }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="searchTerm" class="empty-state">
        <p>Press Enter or click "Search" to find articles...</p>
      </div>
    </main>
  </div>
</template>


