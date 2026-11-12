---
title: Blog一覧
draft: true
prev: false
---

# Blog一覧

日々の業務からのメモです。

<script setup>
// 同じフォルダにある posts.data からデータだけをインポート
import { data as posts } from './posts.data'

// 日付フォーマット関数
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<div class="post-list">
  <article v-for="post in posts" :key="post.url" class="post-item">
    <time v-if="post.date" :datetime="post.date">{{ formatDate(post.date) }}</time>
    <h3>
      <a :href="post.url">{{ post.title }}</a>
    </h3>
  </article>
</div>

<style scoped>
.post-list { margin-top: 1.5rem; }
.post-item { margin-bottom: 1rem; }
time { font-size: 1.2rem; color: var(--vp-c-text-2); margin-right: 10px; }
h3 { display: inline-block; margin: 0; font-size: 1.2rem; }
a { color: var(--vp-c-brand-1); text-decoration: none; }
a:hover { text-decoration: underline; }
</style>
