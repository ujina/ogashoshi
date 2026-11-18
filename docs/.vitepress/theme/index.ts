import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import BlogTitle from './BlogTitle.vue'
import LinkCard from './components/LinkCard.vue'
import './custom.css'
import './blog-note.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // ブログ記事の本文の上に、タイトルと日付を自動で表示する
      'doc-before': () => h(BlogTitle),
    })
  },
  enhanceApp({ app }) {
    // 記事の中で使える部品（使い方は CLAUDE.md）
    app.component('LinkCard', LinkCard)
  },
}
