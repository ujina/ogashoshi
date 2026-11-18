<script setup lang="ts">
// ブログ記事（docs/blog/*.md）のページだけ、frontmatter の title と date を見出しとして表示する
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()

const isBlogPost = computed(() => {
  const path = page.value.relativePath
  return path.startsWith('blog/') && !path.endsWith('index.md')
})

const formattedDate = computed(() => {
  const value = frontmatter.value.date
  if (!value) return ''
  const date = new Date(String(value))
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
})
</script>

<template>
  <header v-if="isBlogPost && frontmatter.title" class="blog-title">
    <h1>{{ frontmatter.title }}</h1>
    <time v-if="formattedDate" :datetime="String(frontmatter.date)">{{ formattedDate }}</time>
  </header>
</template>

<!-- 見た目は blog-note.css（note 風）で指定している -->
