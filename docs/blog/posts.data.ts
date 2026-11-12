// docs/blog/posts.data.ts
import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string | null
}

// 1. data という名前で明示的に型を宣言して export する（ビルドエラー対策）
export declare const data: Post[]

// 2. デフォルトエクスポートでコンテンツを収集・成形する
export default createContentLoader('blog/*.md', {
  includeSrc: false,
  render: false,
  transform(raw): Post[] {
    return raw
      .filter(({ frontmatter }) => !frontmatter.draft)
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || '無題の記事',
        url,
        date: frontmatter.date ? String(frontmatter.date) : null
      }))
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0
        const dateB = b.date ? new Date(b.date).getTime() : 0
        return dateB - dateA
      })
  }
})
