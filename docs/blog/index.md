---
title: Blog
---

<script setup>
import { data as posts } from './posts.data'
</script>

# Blog

日々の業務からのメモです。

<div v-for="post in posts" :key="post.url" class="post-item">
  <h2><a :href="post.url">{{ post.title }}</a></h2>
  <p v-if="post.description">{{ post.description }}</p>
  <p><a :href="post.url">続きを読む →</a></p>
</div>
