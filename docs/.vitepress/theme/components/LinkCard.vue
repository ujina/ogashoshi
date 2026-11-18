<script setup lang="ts">
// 記事の中で <LinkCard url="https://..." /> と書くと、サムネイル画像・タイトル・説明の付いたカードになる。
// 中身（タイトルなど）は、ビルド時に docs/.vitepress/linkcard.ts が相手のページから取ってきて
// frontmatter.linkCards に入れたものを使う。取れなかったときは URL だけのカードになる。
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{ url: string }>()
const { frontmatter } = useData()

const card = computed(() => {
  const data = frontmatter.value.linkCards?.[props.url]
  let host = props.url
  try {
    host = new URL(props.url).hostname
  } catch {}
  return {
    title: data?.title || props.url,
    description: data?.description || '',
    image: data?.image || '',
    siteName: data?.siteName || host,
  }
})
</script>

<template>
  <a class="link-card" :href="url" target="_blank" rel="noopener noreferrer">
    <span class="link-card-body">
      <span class="link-card-title">{{ card.title }}</span>
      <span v-if="card.description" class="link-card-description">{{ card.description }}</span>
      <span class="link-card-site">{{ card.siteName }}</span>
    </span>
    <img v-if="card.image" class="link-card-image" :src="card.image" alt="" loading="lazy" />
  </a>
</template>

<style scoped>
/* 本文の中のリンクや画像の見た目（blog-note.css など）が当たらないよう、.vp-doc から指定している */
.vp-doc .link-card,
.link-card {
  display: flex;
  align-items: stretch;
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-weight: 400;
  transition: border-color 0.2s, background-color 0.2s;
}

.vp-doc .link-card:hover,
.link-card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
}

.link-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  padding: 14px 18px;
}

.link-card-title {
  display: -webkit-box;
  overflow: hidden;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.link-card-description {
  display: -webkit-box;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.link-card-site {
  overflow: hidden;
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  text-overflow: ellipsis;
}

.vp-doc .link-card .link-card-image,
.link-card .link-card-image {
  display: block;
  flex: 0 0 auto;
  width: 220px;
  max-width: 40%;
  height: auto;
  margin: 0;
  object-fit: cover;
  border-left: 1px solid var(--vp-c-divider);
}

@media (max-width: 639px) {
  .link-card-body {
    padding: 12px 14px;
  }

  .link-card-title {
    font-size: 14px;
  }

  .link-card-description {
    display: none;
  }

  .vp-doc .link-card .link-card-image,
  .link-card .link-card-image {
    width: 120px;
  }
}
</style>
