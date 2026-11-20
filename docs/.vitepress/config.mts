import { defineConfig } from 'vitepress'
import { collectLinkCards } from './linkcard'
import { netlifyImages } from './netlify-image'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'ja',
  title: 'おがさわら行政書士事務所',
  description: '広島市南区の行政書士事務所です。許認可申請、相続・遺言、法人設立などの行政手続と書類作成を取り扱っています。',

  // 最終更新日の表示（Git の履歴から取得）
  lastUpdated: true,

  // ブログ一覧のファイルは docs/blog の外に置き、URL は /blog/ のまま公開する
  // （docs/blog には記事だけを置き、CMS の記事一覧に一覧ページが混ざらないようにするため）
  rewrites: {
    'blog-index.md': 'blog/index.md',
  },

  // ブログ記事に共通の設定（記事ごとの frontmatter に書いた値が優先される）
  async transformPageData(pageData, { siteConfig }) {
    // 記事の中の <LinkCard url="..."> の相手ページから、サムネイル・タイトル・説明を取ってくる（linkcard.ts）
    const linkCards = await collectLinkCards(siteConfig.srcDir, pageData.filePath)
    if (linkCards) pageData.frontmatter.linkCards = linkCards

    if (pageData.relativePath.startsWith('blog/')) {
      // 一覧ページ以外（＝記事）には、note 風の見た目用の設定を付ける
      const isPost = !pageData.relativePath.endsWith('index.md')
      pageData.frontmatter = {
        next: false,
        ...(isPost
          ? {
              prev: false,
              aside: false, // 右側の目次を出さない
              pageClass: 'blog-post', // blog-note.css の見た目を当てる目印
            }
          : {}),
        ...pageData.frontmatter,
      }
    }
  },

  markdown: {
    // 記事の画像を、Netlify でビルドしたときだけ Netlify Image CDN で縮めて配る（netlify-image.ts）
    config(md) {
      netlifyImages(md)
    },
    // 記事の画像は、画面に近づいてから読み込む
    image: {
      lazyLoad: true,
    },
    container: {
      tipLabel: 'ヒント',
      warningLabel: '注意',
      dangerLabel: '警告',
      infoLabel: '情報',
      detailsLabel: '詳細',
    },
  },

  themeConfig: {
    logo: '/ogashoshi_logo.jpeg',

    nav: [
      { text: 'BLOG', link: '/blog/' },
      { text: '業務案内', link: '/guide/' },
      { text: '報酬表', link: '/fee/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '業務案内',
          items: [
            { text: '事務所案内', link: '/guide/' },
            { text: '事業復活支援金の事前確認', link: '/guide/zizen-kakunin' },
          ],
        },
      ],
      '/fee/': [
        {
          text: '報酬表',
          items: [
            { text: '報酬・費用について', link: '/fee/' },
          ],
        },
      ],
    },

    footer: {
      message: 'Made by Toru Ogasawara with ❤️',
    },

    // 画面の文言を日本語にする
    lastUpdated: { text: '最終更新日' },
    outline: { level: [2, 3], label: '目次' },
    docFooter: { prev: '前のページ', next: '次のページ' },
    returnToTopLabel: 'ページの先頭へ',
    sidebarMenuLabel: 'メニュー',
    darkModeSwitchLabel: '表示モード',
    lightModeSwitchTitle: 'ライトモードに切り替え',
    darkModeSwitchTitle: 'ダークモードに切り替え',
    notFound: {
      title: 'ページが見つかりません',
      quote: 'お探しのページは移動または削除された可能性があります。',
      linkText: 'トップページへ',
    },
  },
})
