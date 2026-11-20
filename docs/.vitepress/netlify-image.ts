// docs/.vitepress/netlify-image.ts
// 記事の中の画像（![説明](/images/写真.jpeg) など、サイト内の画像）を、
// Netlify でビルドしたときだけ Netlify Image CDN 経由で配るように書き換える。
//   /images/写真.jpeg → /.netlify/images?url=%2Fimages%2F写真.jpeg&w=1240
// Netlify が幅 1240px（本文の幅 620px の2倍＝高精細な画面向け）に縮め、
// ブラウザに合わせて AVIF / WebP などの軽い形式に変えて配る。
// Mac の開発サーバー（npm run docs:dev）には /.netlify/images がないので、元の画像のまま表示する。
import type MarkdownIt from 'markdown-it'

const WIDTH = 1240
const TARGET = /\.(jpe?g|png|webp|avif)$/i

export function netlifyImages(md: MarkdownIt) {
  const onNetlify = process.env.NETLIFY === 'true'
  const original = md.renderer.rules.image!
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    // 先に VitePress の処理（画像の縦横の大きさを付けるなど）を済ませ、できあがった img の src だけを差し替える
    const html = original(tokens, idx, options, env, self)
    if (!onNetlify) return html
    const src = tokens[idx].attrGet('src') || ''
    // サイト内の画像（/ で始まる）だけ。外部の画像や、すでに変換済みのものはそのまま
    if (!src.startsWith('/') || src.startsWith('//') || src.startsWith('/.netlify/')) return html
    const path = src.split(/[?#]/)[0]
    if (!TARGET.test(path)) return html
    const cdn = `/.netlify/images?url=${encodeURIComponent(path).replace(/'/g, '%27')}&w=${WIDTH}`
    // ふつうの src="/..." にすると、Vite がサイト内のファイルだと思って読み込もうとし、ビルドに失敗する。
    // :src="'...'"（Vue の式として渡す文字列）にすると、そのままの URL として出力される
    return html.replace(`src="${md.utils.escapeHtml(src)}"`, `:src="'${md.utils.escapeHtml(cdn)}'"`)
  }
}
