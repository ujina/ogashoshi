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

<style scoped>
.blog-title {
  margin-bottom: 24px;
}

/* VitePress の本文の見出し（h1）と同じ大きさにそろえる */
.blog-title h1 {
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.blog-title time {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
</style>
