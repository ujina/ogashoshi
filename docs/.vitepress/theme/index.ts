import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import BlogTitle from './BlogTitle.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // ブログ記事の本文の上に、タイトルと日付を自動で表示する
      'doc-before': () => h(BlogTitle),
    })
  },
}
