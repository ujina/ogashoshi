// docs/blog/posts.data.ts
// blog フォルダの記事を集めて、ブログ一覧用のデータを作る
import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  description: string
  postId: number
}

export declare const data: Post[]

export default createContentLoader('blog/*.md', {
  transform(raw): Post[] {
    return raw
      .filter(({ url, frontmatter }) => url !== '/blog/' && !frontmatter.draft)
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || '無題の記事',
        url,
        description: frontmatter.description || '',
        postId: Number(frontmatter.postId) || 0,
      }))
      // postId（例: 20231102）の新しい順に並べる
      .sort((a, b) => b.postId - a.postId)
  },
})
